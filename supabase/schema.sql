-- Run in the Supabase SQL Editor before using the API.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default 'MindCare member' check (char_length(display_name) between 1 and 40),
  role text not null default 'user' check (role in ('user', 'expert', 'admin')),
  reputation integer not null default 0 check (reputation between 0 and 1000),
  created_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  author_user_id uuid references public.profiles (id) on delete cascade,
  topic text not null check (char_length(topic) between 1 and 40),
  content text not null check (char_length(content) between 3 and 3000),
  is_anonymous boolean not null default true,
  anonymity_mode text not null default 'unlinked'
    check (anonymity_mode in ('unlinked', 'moderator_only', 'public')),
  status text not null default 'pending_ai'
    check (status in ('pending_ai', 'pending_review', 'published', 'rejected', 'removed')),
  created_at timestamptz not null default now(),
  constraint post_anonymity_matches_author check (
    (anonymity_mode = 'unlinked' and is_anonymous and author_user_id is null) or
    (anonymity_mode = 'moderator_only' and is_anonymous and author_user_id is not null) or
    (anonymity_mode = 'public' and not is_anonymous and author_user_id is not null)
  )
);

alter table public.profiles
  add column if not exists role text not null default 'user'
  check (role in ('user', 'expert', 'admin'));
alter table public.posts
  add column if not exists anonymity_mode text not null default 'unlinked';
alter table public.posts drop constraint if exists posts_status_check;
alter table public.posts drop constraint if exists anonymous_posts_have_no_author;
alter table public.posts drop constraint if exists post_anonymity_matches_author;

update public.posts
set anonymity_mode = case
  when not is_anonymous then 'public'
  when author_user_id is null then 'unlinked'
  else 'moderator_only'
end,
status = case status
  when 'approved' then 'published'
  when 'pending' then 'pending_ai'
  else status
end;

alter table public.posts alter column status set default 'pending_ai';
alter table public.posts
  add constraint posts_status_check
  check (status in ('pending_ai', 'pending_review', 'published', 'rejected', 'removed'));
alter table public.posts
  add constraint post_anonymity_matches_author check (
    (anonymity_mode = 'unlinked' and is_anonymous and author_user_id is null) or
    (anonymity_mode = 'moderator_only' and is_anonymous and author_user_id is not null) or
    (anonymity_mode = 'public' and not is_anonymous and author_user_id is not null)
  );

create table if not exists public.user_post_limits (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  limit_date date not null default current_date,
  post_count integer not null default 0 check (post_count between 0 and 10),
  last_post_at timestamptz
);

create table if not exists public.check_ins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  check_in_date date not null default current_date,
  mood_score smallint not null check (mood_score between 1 and 5),
  sleep_hours numeric(4, 1) check (sleep_hours between 0 and 24),
  sleep_quality smallint check (sleep_quality between 1 and 5),
  note text check (char_length(note) <= 500),
  created_at timestamptz not null default now(),
  unique (user_id, check_in_date)
);

alter table public.profiles enable row level security;
alter table public.posts enable row level security;
alter table public.check_ins enable row level security;

create or replace function public.la_quan_tri()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

drop policy if exists "Members can read their own posts" on public.posts;
drop policy if exists "Admins can review all posts" on public.posts;
drop policy if exists "Approved posts are public" on public.posts;
drop policy if exists "Members can read own profile" on public.profiles;
drop policy if exists "Authors of approved posts are visible" on public.profiles;
drop policy if exists "Members can update their own display name" on public.profiles;
drop policy if exists "Members can manage own check-ins" on public.check_ins;
drop policy if exists "Members can submit posts as themselves" on public.posts;
drop function if exists public.is_admin();

create policy "Members can read their own posts" on public.posts
  for select to authenticated using (author_user_id = auth.uid());
create policy "Admins can review all posts" on public.posts
  for select to authenticated using (public.la_quan_tri());
create policy "Members can read own profile" on public.profiles
  for select to authenticated using (auth.uid() = id);
create policy "Authors of approved posts are visible" on public.profiles
  for select using (
    exists (
      select 1 from public.posts
      where posts.author_user_id = profiles.id
        and posts.anonymity_mode = 'public'
        and posts.status = 'published'
    )
  );
revoke update on public.profiles from anon, authenticated;
revoke select on public.profiles from anon, authenticated;
grant select (id, display_name, reputation) on public.profiles to anon, authenticated;
grant update (display_name) on public.profiles to authenticated;
create policy "Members can update their own display name" on public.profiles
  for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);
create policy "Members can manage own check-ins" on public.check_ins
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "Members can submit posts as themselves" on public.posts;
create policy "Members can submit posts as themselves" on public.posts
  for insert to authenticated with check (
    status = 'pending_ai' and (
      (anonymity_mode = 'unlinked' and is_anonymous and author_user_id is null) or
      (anonymity_mode = 'moderator_only' and is_anonymous and author_user_id = auth.uid()) or
      (anonymity_mode = 'public' and not is_anonymous and author_user_id = auth.uid())
    )
  );

create or replace function public.kiem_tra_gioi_han_bai_viet()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  ma_nguoi_dung uuid := auth.uid();
  gioi_han public.user_post_limits;
  hom_nay date := (now() at time zone 'Asia/Ho_Chi_Minh')::date;
begin
  if ma_nguoi_dung is null then
    raise exception 'Authentication is required to submit a post';
  end if;

  insert into public.user_post_limits (user_id, limit_date)
  values (ma_nguoi_dung, hom_nay)
  on conflict (user_id) do nothing;

  select * into gioi_han
  from public.user_post_limits
  where user_id = ma_nguoi_dung
  for update;

  if gioi_han.limit_date < hom_nay then
    update public.user_post_limits
    set limit_date = hom_nay, post_count = 0, last_post_at = null
    where user_id = ma_nguoi_dung;
    gioi_han.post_count := 0;
    gioi_han.last_post_at := null;
  end if;

  if gioi_han.post_count >= 10 then
    raise exception 'RATE_LIMIT: daily post limit reached';
  end if;
  if gioi_han.last_post_at > now() - interval '30 seconds' then
    raise exception 'RATE_LIMIT: wait before submitting another post';
  end if;

  update public.user_post_limits
  set post_count = post_count + 1, last_post_at = now()
  where user_id = ma_nguoi_dung;

  new.status := 'pending_ai';
  return new;
end;
$$;

drop trigger if exists trg_enforce_post_rate_limit on public.posts;
drop function if exists public.enforce_post_rate_limit();
create trigger trg_enforce_post_rate_limit
  before insert on public.posts
  for each row execute function public.kiem_tra_gioi_han_bai_viet();

create or replace view public.community_posts as
  select p.id, p.topic, p.content, p.is_anonymous, p.created_at,
         case when p.anonymity_mode = 'public' then author.display_name else 'Ẩn danh' end as author_name
  from public.posts p
  left join public.profiles author on author.id = p.author_user_id
  where p.status = 'published';

alter table public.user_post_limits enable row level security;
revoke all on public.user_post_limits from anon, authenticated;
revoke select on public.posts from public, anon;
grant select on public.posts to authenticated;
grant insert on public.posts to authenticated;
grant select on public.community_posts to anon, authenticated;

create or replace function public.tao_ho_so_nguoi_dung_moi()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(nullif(new.raw_user_meta_data ->> 'display_name', ''), 'MindCare member'));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.create_profile_for_new_user();
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.tao_ho_so_nguoi_dung_moi();

create table if not exists public.user_relationships (
  follower_id uuid not null references public.profiles (id) on delete cascade,
  following_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, following_id),
  check (follower_id <> following_id)
);

create table if not exists public.post_reports (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts (id) on delete cascade,
  reporter_id uuid not null references public.profiles (id) on delete cascade,
  reason text not null check (char_length(reason) between 3 and 500),
  status text not null default 'pending' check (status in ('pending', 'reviewed', 'dismissed')),
  created_at timestamptz not null default now(),
  unique (post_id, reporter_id)
);

create table if not exists public.reputation_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  actor_id uuid references public.profiles (id) on delete set null,
  points_delta integer not null check (points_delta between -1000 and 1000),
  reason text not null check (char_length(reason) between 1 and 120),
  created_at timestamptz not null default now()
);

create table if not exists public.knowledge_articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null check (char_length(title) between 1 and 160),
  category text not null check (char_length(category) between 1 and 60),
  content text not null,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.user_relationships enable row level security;
alter table public.post_reports enable row level security;
alter table public.reputation_events enable row level security;
alter table public.knowledge_articles enable row level security;

create policy "Members can view relationships involving themselves" on public.user_relationships
  for select to authenticated using (auth.uid() = follower_id or auth.uid() = following_id);
create policy "Members can follow other members" on public.user_relationships
  for insert to authenticated with check (auth.uid() = follower_id);
create policy "Members can unfollow members" on public.user_relationships
  for delete to authenticated using (auth.uid() = follower_id);
create policy "Members can submit a report once per post" on public.post_reports
  for insert to authenticated with check (auth.uid() = reporter_id);
create policy "Members can view their own reports" on public.post_reports
  for select to authenticated using (auth.uid() = reporter_id);
create policy "Members can view their reputation history" on public.reputation_events
  for select to authenticated using (auth.uid() = user_id);
create policy "Published knowledge is public" on public.knowledge_articles
  for select using (is_published);

grant usage on schema public to anon, authenticated;
grant select on public.posts to anon, authenticated;
grant insert on public.posts to authenticated;
grant select, insert, update on public.check_ins to authenticated;
grant select, insert, delete on public.user_relationships to authenticated;
grant select, insert on public.post_reports to authenticated;
grant select on public.reputation_events to authenticated;
grant select on public.knowledge_articles to anon, authenticated;
