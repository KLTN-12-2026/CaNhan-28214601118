const { Router: taoBoDinhTuyen } = require('express');
const { taoKhachHangSupabase } = require('../config/supabase');
const yeuCauXacThuc = require('../middleware/require-auth');

const boDinhTuyen = taoBoDinhTuyen();

boDinhTuyen.get('/', async (_yeuCau, phanHoi, chuyenTiep) => {
  try {
    const khachSupabase = taoKhachHangSupabase();
    if (!khachSupabase) return phanHoi.status(503).json({ error: 'Supabase is not configured yet.' });
    const { data: duLieu, error: loi } = await khachSupabase
      .from('community_posts')
      .select('id, topic, content, is_anonymous, created_at, author_name')
      .order('created_at', { ascending: false })
      .limit(50);
    if (loi) return chuyenTiep(loi);
    return phanHoi.json({ posts: duLieu });
  } catch (loi) {
    return chuyenTiep(loi);
  }
});

boDinhTuyen.post('/', yeuCauXacThuc, async (yeuCau, phanHoi, chuyenTiep) => {
  try {
    const { content: noiDung, topic: chuDe, anonymityMode: cheDoDanhTinh = 'unlinked' } = yeuCau.body;
    if (typeof noiDung !== 'string' || noiDung.trim().length < 3 || noiDung.length > 3000) {
      return phanHoi.status(400).json({ error: 'Post content must be between 3 and 3000 characters.' });
    }
    if (typeof chuDe !== 'string' || chuDe.length > 40) {
      return phanHoi.status(400).json({ error: 'A valid topic is required.' });
    }
    if (!['unlinked', 'moderator_only', 'public'].includes(cheDoDanhTinh)) {
      return phanHoi.status(400).json({ error: 'Choose a valid post identity mode.' });
    }
    const { error: loi } = await yeuCau.supabase
      .from('posts')
      .insert({
        content: noiDung.trim(),
        topic: chuDe,
        is_anonymous: cheDoDanhTinh !== 'public',
        anonymity_mode: cheDoDanhTinh,
        author_user_id: cheDoDanhTinh === 'unlinked' ? null : yeuCau.user.id,
        status: 'pending_ai'
      });
    if (loi) return chuyenTiep(loi);
    return phanHoi.status(201).json({ message: 'Post submitted for review.', status: 'pending_ai' });
  } catch (loi) {
    return chuyenTiep(loi);
  }
});

module.exports = boDinhTuyen;
