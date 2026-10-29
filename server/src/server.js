const duongDan = require('node:path');
const napCauHinh = require('dotenv');

napCauHinh.config({ path: duongDan.resolve(__dirname, '../../.env') });

const ungDung = require('./app');
const cong = Number(process.env.PORT) || 3000;

ungDung.listen(cong, () => {
  console.log(`MindCare is running at http://localhost:${cong}`);
});
