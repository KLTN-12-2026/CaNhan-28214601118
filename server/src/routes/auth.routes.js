const { Router: taoBoDinhTuyen } = require('express');
const { taoKhachHangSupabase } = require('../config/supabase');
const yeuCauXacThuc = require('../middleware/require-auth');

const boDinhTuyen = taoBoDinhTuyen();

boDinhTuyen.post('/signup', async (yeuCau, phanHoi, chuyenTiep) => {
  try {
    const { email: thuDienTu, password: matKhau, displayName: tenHienThi } = yeuCau.body;
    if (!thuDienTu || !matKhau || matKhau.length < 8) {
      return phanHoi.status(400).json({ error: 'Email and a password of at least 8 characters are required.' });
    }
    const khachSupabase = taoKhachHangSupabase();
    if (!khachSupabase) return phanHoi.status(503).json({ error: 'Supabase is not configured yet.' });

    const { data: duLieu, error: loi } = await khachSupabase.auth.signUp({
      email: thuDienTu,
      password: matKhau,
      options: { data: { display_name: String(tenHienThi || '').slice(0, 40) } }
    });
    if (loi) return phanHoi.status(400).json({ error: loi.message });
    return phanHoi.status(201).json({ user: duLieu.user, session: duLieu.session });
  } catch (loi) {
    return chuyenTiep(loi);
  }
});

boDinhTuyen.post('/login', async (yeuCau, phanHoi, chuyenTiep) => {
  try {
    const { email: thuDienTu, password: matKhau } = yeuCau.body;
    if (!thuDienTu || !matKhau) return phanHoi.status(400).json({ error: 'Email and password are required.' });
    const khachSupabase = taoKhachHangSupabase();
    if (!khachSupabase) return phanHoi.status(503).json({ error: 'Supabase is not configured yet.' });

    const { data: duLieu, error: loi } = await khachSupabase.auth.signInWithPassword({ email: thuDienTu, password: matKhau });
    if (loi) return phanHoi.status(401).json({ error: loi.message });
    return phanHoi.json({ user: duLieu.user, session: duLieu.session });
  } catch (loi) {
    return chuyenTiep(loi);
  }
});

boDinhTuyen.get('/me', yeuCauXacThuc, async (yeuCau, phanHoi, chuyenTiep) => {
  try {
    const { data: duLieu, error: loi } = await yeuCau.supabase
      .from('profiles')
      .select('display_name, reputation')
      .eq('id', yeuCau.user.id)
      .single();
    if (loi) return chuyenTiep(loi);
    return phanHoi.json({ user: { id: yeuCau.user.id, email: yeuCau.user.email }, profile: duLieu });
  } catch (loi) {
    return chuyenTiep(loi);
  }
});

boDinhTuyen.patch('/me', yeuCauXacThuc, async (yeuCau, phanHoi, chuyenTiep) => {
  try {
    const tenHienThi = typeof yeuCau.body.displayName === 'string' ? yeuCau.body.displayName.trim() : '';
    if (tenHienThi.length < 1 || tenHienThi.length > 40) {
      return phanHoi.status(400).json({ error: 'Display name must be between 1 and 40 characters.' });
    }
    const { data: duLieu, error: loi } = await yeuCau.supabase
      .from('profiles')
      .update({ display_name: tenHienThi })
      .eq('id', yeuCau.user.id)
      .select('display_name, reputation')
      .single();
    if (loi) return chuyenTiep(loi);
    return phanHoi.json({ profile: duLieu });
  } catch (loi) {
    return chuyenTiep(loi);
  }
});

module.exports = boDinhTuyen;
