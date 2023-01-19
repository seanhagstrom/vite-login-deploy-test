const { Pool } = require('pg');
const DB_NAME = 'univ-boilerplate';
const connectionString =
  process.env.DATABASE_URL || `https://localhost:5432/${DB_NAME}`;

const pool = new Pool({
  connectionString,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : undefined,
});

module.exports = pool;

// module.exports = {
//   async query(text, params) {
//     const start = Date.now();
//     const res = await pool.query(text, params);
//     const duration = Date.now() - start;
//     console.log('executed query', { text, duration, rows: res.rowCount });
//     return res;
//   },

//   async getClient() {
//     const client = await pool.connect();
//     const query = client.query;
//     const release = client.release;
//     console.log('this is query: ', query);
//     // set a timeout of 5 seconds, after which we will log this client's last query
//     const timeout = setTimeout(() => {
//       console.error('A client has been checked out for more than 5 seconds!');
//       console.error(
//         `The last executed query on this client was: ${client.lastQuery}`
//       );
//     }, 5000);
//     // monkey patch the query method to keep track of the last query executed
//     client.query = (...args) => {
//       client.lastQuery = args;
//       return query.apply(client, args);
//     };
//     client.release = (log) => {
//       // clear our timeout
//       clearTimeout(timeout);
//       // set the methods back to their old un-monkey-patched version
//       client.query = query;
//       client.release = release;
//       log();

//       return release.apply(client);
//     };
//     return client;
//   },
// };
