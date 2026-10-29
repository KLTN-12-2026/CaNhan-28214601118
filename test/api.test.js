const kiemTra = require('node:assert/strict');
const { after: sau, before: truoc, test: kiemThu } = require('node:test');

delete process.env.SUPABASE_URL;
delete process.env.SUPABASE_ANON_KEY;
const ungDung = require('../server/src/app');

let mayChu;
let diaChiGoc;

truoc(async () => {
  await new Promise((hoanTat) => {
    mayChu = ungDung.listen(0, '127.0.0.1', () => {
      diaChiGoc = `http://127.0.0.1:${mayChu.address().port}`;
      hoanTat();
    });
  });
});

sau(async () => {
  await new Promise((hoanTat, tuChoi) => {
    mayChu.close((loi) => loi ? tuChoi(loi) : hoanTat());
  });
});

kiemThu('health endpoint reports API and Supabase setup state', async () => {
  const phanHoi = await fetch(`${diaChiGoc}/api/health`);
  kiemTra.equal(phanHoi.status, 200);
  kiemTra.deepEqual(await phanHoi.json(), {
    status: 'ok',
    service: 'mindcare-api',
    supabaseConfigured: false
  });
});

kiemThu('serves the MindCare frontend at the root path', async () => {
  const phanHoi = await fetch(`${diaChiGoc}/`);
  kiemTra.equal(phanHoi.status, 200);
  kiemTra.match(await phanHoi.text(), /MindCare \| Chăm sóc tinh thần/);
});

kiemThu('Supabase-backed routes fail clearly when configuration is missing', async () => {
  const phanHoiBaiViet = await fetch(`${diaChiGoc}/api/posts`);
  kiemTra.equal(phanHoiBaiViet.status, 503);
  kiemTra.match((await phanHoiBaiViet.json()).error, /Supabase is not configured/);

  const phanHoiDangNhap = await fetch(`${diaChiGoc}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'member@example.com', password: 'long-enough-password' })
  });
  kiemTra.equal(phanHoiDangNhap.status, 503);
});
