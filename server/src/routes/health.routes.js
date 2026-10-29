const { Router: taoBoDinhTuyen } = require('express');
const { kiemTraSupabaseDaCauHinh } = require('../config/supabase');

const boDinhTuyen = taoBoDinhTuyen();

boDinhTuyen.get('/', (_yeuCau, phanHoi) => {
  phanHoi.json({
    status: 'ok',
    service: 'mindcare-api',
    supabaseConfigured: kiemTraSupabaseDaCauHinh()
  });
});

module.exports = boDinhTuyen;
