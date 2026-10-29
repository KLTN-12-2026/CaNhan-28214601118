const { taoKhachHangSupabase } = require('../config/supabase');

async function yeuCauXacThuc(yeuCau, phanHoi, chuyenTiep) {
  const maTruyCap = yeuCau.get('authorization')?.replace(/^Bearer\s+/i, '');
  const khachSupabase = taoKhachHangSupabase();

  if (!khachSupabase) {
    return phanHoi.status(503).json({ error: 'Supabase is not configured yet.' });
  }
  if (!maTruyCap) {
    return phanHoi.status(401).json({ error: 'Sign in is required.' });
  }

  const { data: duLieu, error: loi } = await khachSupabase.auth.getUser(maTruyCap);
  if (loi || !duLieu.user) {
    return phanHoi.status(401).json({ error: 'Session is invalid or expired.' });
  }

  yeuCau.user = duLieu.user;
  yeuCau.supabase = taoKhachHangSupabase(maTruyCap);
  return chuyenTiep();
}

module.exports = yeuCauXacThuc;
