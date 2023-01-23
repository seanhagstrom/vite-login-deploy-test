const app = require('./app');
require('dotenv').config();

const { Port = 8080 } = process.env;

app.listen(Port, () => {
  console.log(`Example app listening on port ${Port}`);
});
