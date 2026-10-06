const path = require('node:path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = require('./app');
const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`MindCare is running at http://localhost:${port}`);
});
