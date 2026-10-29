const { createClient: taoKhachHang } = require('@supabase/supabase-js');

const duongDanSupabase = process.env.SUPABASE_URL;
const khoaCongKhaiSupabase = process.env.SUPABASE_ANON_KEY;

function kiemTraSupabaseDaCauHinh() {
  return Boolean(duongDanSupabase && khoaCongKhaiSupabase);
}

function taoKhachHangSupabase(maTruyCap) {
  if (!kiemTraSupabaseDaCauHinh()) return null;

  return taoKhachHang(duongDanSupabase, khoaCongKhaiSupabase, {
    auth: { persistSession: false, autoRefreshToken: false },
    ...(maTruyCap ? { global: { headers: { Authorization: `Bearer ${maTruyCap}` } } } : {})
  });
}

module.exports = { taoKhachHangSupabase, kiemTraSupabaseDaCauHinh };
