/* eslint-disable no-console */
const app = require('./app');
const { PORT, DATABASE_URL, NODE_ENV } = require('./config');
const knex = require('knex');

let db = knex({
  client: 'pg',
  connection: DATABASE_URL,
});
app.set('db', db);

app.listen(PORT, () =>
  console.log(
    `Server listening in ${NODE_ENV} mode at http://localhost:${PORT}`
  )
);
