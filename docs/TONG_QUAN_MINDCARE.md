# Tổng quan dự án MindCare

MindCare là nền tảng hỗ trợ chăm sóc sức khỏe tinh thần. Dự án hiện là bộ khung khởi đầu dùng HTML, CSS, JavaScript thuần ở frontend, Node.js/Express ở backend và Supabase Auth/Postgres cho tài khoản, dữ liệu.

> MindCare hiện chỉ là công cụ hỗ trợ ban đầu, không thay thế chẩn đoán, điều trị hoặc dịch vụ cấp cứu.

## 1. Công nghệ và cấu trúc

```text
public/
  index.html                 Trang ứng dụng
  css/styles.css             Giao diện responsive
  js/app.js                  Khởi tạo ứng dụng và Panic dialog
  js/router.js               Điều hướng phía trình duyệt
  js/api.js                  Gọi API và escape nội dung
   js/pages/                  Các trang tổng quan, cộng đồng, check-in, tự đánh giá, thư viện, tài khoản
server/src/
  server.js                  Nạp .env và khởi động Express
  app.js                     Middleware và đăng ký router
  config/supabase.js         Supabase client
  middleware/                Xác thực và xử lý lỗi
  routes/                    Auth, bài viết, check-in, health
supabase/schema.sql          Bảng, RLS, view cộng đồng và giới hạn đăng bài
 test/api.test.js             Kiểm thử HTTP cơ bản
```

## 2. Các trang hiện có

- **Tổng quan:** check-in tâm trạng nhanh và đường dẫn đến thư giãn/cộng đồng.
- **Cộng đồng:** chọn chủ đề, soạn bài và chọn cách hiển thị danh tính. Bài mới được đưa vào hàng chờ kiểm duyệt.
- **Check-in:** ghi mức tâm trạng, thời lượng/chất lượng giấc ngủ và ghi chú riêng.
- **Bài tự đánh giá:** DASS-21, PHQ-9, GAD-7, WHO-5 và PSQI; tính điểm ngay trên trình duyệt, không lưu câu trả lời hoặc gửi tới AI. PHQ-9 có thông báo hỗ trợ an toàn khi câu 9 được chọn khác 0. Kết quả chỉ để tham khảo, không thay thế đánh giá chuyên môn.
- **Thư viện:** bài tập thở có thể tạm dừng và liên kết thông tin sức khỏe tinh thần.
- **Tài khoản:** đăng ký, đăng nhập, đổi tên hiển thị và đăng xuất.
- **Panic Button:** hộp thoại grounding cơ bản và liên kết gọi 115. Chưa gửi cảnh báo hay tạo sự kiện trong Supabase.

## 3. Backend và API

Express phục vụ đồng thời frontend tĩnh và API dưới `/api`.

- `GET /api/health`: trạng thái API và việc server đã đọc đủ biến Supabase hay chưa.
- `POST /api/auth/signup`, `POST /api/auth/login`, `GET /api/auth/me`, `PATCH /api/auth/me`: đăng ký, đăng nhập, đọc hồ sơ và đổi tên.
- `GET /api/posts`, `POST /api/posts`: đọc view cộng đồng và gửi bài chờ duyệt.
- `GET /api/check-ins`, `POST /api/check-ins`: đọc/tạo check-in riêng tư, tối đa một bản ghi mỗi tài khoản mỗi ngày.

Route yêu cầu đăng nhập xác minh access token với Supabase Auth trước khi truy cập dữ liệu. Lỗi khi chưa cấu hình Supabase được trả về rõ ràng.

## 4. Ba chế độ danh tính bài viết

Cột `anonymity_mode` hỗ trợ ba giá trị:

- `unlinked`: `author_user_id` trên dòng bài viết là `NULL`. View cộng đồng chỉ trả tên “Ẩn danh”. Giới hạn spam được tính bằng bộ đếm theo tài khoản/ngày, nhưng không có liên kết bài viết-tác giả để truy cứu hoặc cộng điểm uy tín cho tác giả.
- `moderator_only`: dòng bài viết giữ `author_user_id` để admin có thể xử lý lạm dụng; view công khai không trả UID hay tên tác giả.
- `public`: dòng bài viết giữ tác giả và view công khai hiển thị tên hiển thị.

API đọc từ `community_posts`, không đọc trực tiếp bảng gốc để hiển thị bảng tin. Bài được tạo với trạng thái `pending_ai`; hiện chưa có AI moderation hoặc giao diện admin để chuyển trạng thái sang `published`.

Ẩn danh `unlinked` không thể đồng thời bảo đảm không tồn tại bất kỳ dấu vết liên kết nào và hỗ trợ chống spam theo tài khoản. MindCare chỉ lưu bộ đếm tổng/ngày trong `user_post_limits`, không lưu ID bài viết trong bộ đếm đó. Không bổ sung log IP/thiết bị nếu cam kết sản phẩm là ẩn danh.

## 5. Cơ sở dữ liệu hiện tại

`supabase/schema.sql` hiện tạo/nâng cấp các phần sau:

- `profiles`: hồ sơ gắn với Supabase Auth, tên hiển thị, vai trò và điểm uy tín.
- `posts`: nội dung, chủ đề, chế độ danh tính và trạng thái kiểm duyệt.
- `user_post_limits`: hạn mức bài viết/ngày và khoảng cách đăng.
- `check_ins`: dữ liệu check-in cá nhân.
- `user_relationships`: quan hệ follow.
- `post_reports`: báo cáo bài viết.
- `reputation_events`: lịch sử biến động điểm.
- `knowledge_articles`: bài viết thư viện kiến thức.
- `community_posts`: view chỉ xuất các bài đã `published` và che tên theo chế độ ẩn danh.

RLS được bật cho dữ liệu chính. Bảng bài viết gốc không được đọc bởi role `anon`; tài khoản thường chỉ đọc bài của mình, admin có thể xem bài để kiểm duyệt. Role admin cần được cấp có kiểm soát, không cho user tự đổi qua API.

**Phạm vi chưa có trong schema hiện tại:** các bảng chi tiết cho chuyên gia/giấy phép, quiz và câu trả lời, phiên chat AI, phòng khám, quan hệ kết bạn, bình luận/reaction, quản lý báo cáo nâng cao và sự kiện Panic. Đây là các phần trong bản thiết kế giai đoạn 1 đã thảo luận, chưa được đưa vào file schema hiện tại.

## 6. Cấu hình và chạy local

Yêu cầu Node.js 20 trở lên và một Supabase project.

1. Cài dependencies:
   ```powershell
   npm install
   ```
2. Tạo `.env`:
   ```powershell
   Copy-Item .env.example .env
   ```
3. Trong **Supabase Dashboard → Project Settings → API**, sao chép **Project URL** và **Publishable key** (hoặc anon/public key legacy) vào `.env`:
   ```env
   PORT=3000
   SUPABASE_URL=https://<project-ref>.supabase.co
   SUPABASE_ANON_KEY=sb_publishable_...
   ```
4. Chạy nội dung `supabase/schema.sql` trong Supabase SQL Editor.
5. Khởi động/restart server:
   ```powershell
   npm run dev
   ```
6. Mở `http://localhost:3000` và kiểm tra `http://localhost:3000/api/health`.

URL phải là Project URL dạng `https://<project-ref>.supabase.co`, không phải đường dẫn trang Dashboard như `supabase.com/dashboard/project/...`. `supabaseConfigured: true` chỉ báo server đọc được hai biến, không xác nhận key thuộc đúng project hay SQL đã chạy thành công.

Không đặt `service_role`/secret key trong `.env` của ứng dụng hoặc frontend. Không gửi key lên chat, GitHub hay ảnh chụp màn hình. File `.env` đã được gitignore.

## 7. Kiểm thử

- `npm test`: smoke test cho health endpoint, trang chủ và phản hồi khi Supabase chưa cấu hình.
- `npm run check`: kiểm tra cú pháp các module backend.
- Frontend JavaScript được viết dưới dạng ES modules của trình duyệt.

Các smoke test hiện tại không kết nối tới project Supabase thật; cần chạy schema và thử đăng ký/check-in/bài viết trong môi trường đã cấu hình để kiểm tra tích hợp database.

## 8. Tính năng còn dự kiến

AI chấm bài test/nguy cơ, lưu lịch sử bài tự đánh giá, AI duyệt bài, chat AI, gợi ý chuyên gia/phòng khám, kết bạn bằng UID, quy tắc cộng/trừ điểm đầy đủ, báo cáo PDF, cảnh báo sớm, quick check tuần/ngày, thư viện âm thanh và quản lý panic event chưa được triển khai hoàn chỉnh. Cần đánh giá quyền riêng tư, đồng thuận, bảo mật và an toàn lâm sàng trước khi đưa dữ liệu sức khỏe thật vào production.
