const { Router: taoBoDinhTuyen } = require('express');
const yeuCauXacThuc = require('../middleware/require-auth');

const boDinhTuyen = taoBoDinhTuyen();

boDinhTuyen.use(yeuCauXacThuc);

boDinhTuyen.get('/', async (yeuCau, phanHoi, chuyenTiep) => {
  try {
    const { data: duLieu, error: loi } = await yeuCau.supabase
      .from('check_ins')
      .select('id, check_in_date, mood_score, sleep_hours, sleep_quality, note, created_at')
      .order('check_in_date', { ascending: false })
      .limit(30);
    if (loi) return chuyenTiep(loi);
    return phanHoi.json({ checkIns: duLieu });
  } catch (loi) {
    return chuyenTiep(loi);
  }
});

boDinhTuyen.post('/', async (yeuCau, phanHoi, chuyenTiep) => {
  try {
    const { moodScore: diemTamTrang, sleepHours: soGioNgu, sleepQuality: chatLuongGiacNgu, note: ghiChu } = yeuCau.body;
    if (!Number.isInteger(diemTamTrang) || diemTamTrang < 1 || diemTamTrang > 5) {
      return phanHoi.status(400).json({ error: 'moodScore must be an integer from 1 to 5.' });
    }
    if (soGioNgu !== undefined && (typeof soGioNgu !== 'number' || soGioNgu < 0 || soGioNgu > 24)) {
      return phanHoi.status(400).json({ error: 'sleepHours must be between 0 and 24.' });
    }
    if (chatLuongGiacNgu !== undefined && (!Number.isInteger(chatLuongGiacNgu) || chatLuongGiacNgu < 1 || chatLuongGiacNgu > 5)) {
      return phanHoi.status(400).json({ error: 'sleepQuality must be an integer from 1 to 5.' });
    }

    const { data: duLieu, error: loi } = await yeuCau.supabase
      .from('check_ins')
      .upsert({
        user_id: yeuCau.user.id,
        check_in_date: new Date().toISOString().slice(0, 10),
        mood_score: diemTamTrang,
        sleep_hours: soGioNgu ?? null,
        sleep_quality: chatLuongGiacNgu ?? null,
        note: typeof ghiChu === 'string' ? ghiChu.slice(0, 500) : null
      }, { onConflict: 'user_id,check_in_date' })
      .select('id, check_in_date, mood_score, sleep_hours, sleep_quality, note')
      .single();
    if (loi) return chuyenTiep(loi);
    return phanHoi.status(201).json({ checkIn: duLieu });
  } catch (loi) {
    return chuyenTiep(loi);
  }
});

module.exports = boDinhTuyen;
