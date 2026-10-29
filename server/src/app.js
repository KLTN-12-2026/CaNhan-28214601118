const duongDan = require('node:path');
const ungDungExpress = require('express');
const tuyenSucKhoe = require('./routes/health.routes');
const tuyenTaiKhoan = require('./routes/auth.routes');
const tuyenBaiViet = require('./routes/posts.routes');
const tuyenCheckIn = require('./routes/check-ins.routes');
const xuLyLoi = require('./middleware/error-handler');

const ungDung = ungDungExpress();

ungDung.use(ungDungExpress.json({ limit: '32kb' }));
ungDung.use('/api/health', tuyenSucKhoe);
ungDung.use('/api/auth', tuyenTaiKhoan);
ungDung.use('/api/posts', tuyenBaiViet);
ungDung.use('/api/check-ins', tuyenCheckIn);
ungDung.use('/api', (_yeuCau, phanHoi) => phanHoi.status(404).json({ error: 'API endpoint not found' }));
ungDung.use(ungDungExpress.static(duongDan.resolve(__dirname, '../../public')));
ungDung.use(xuLyLoi);

module.exports = ungDung;
