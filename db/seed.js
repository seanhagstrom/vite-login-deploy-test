// const { query, getClient } = require('./client');
const client = require('./client');
const { createUser } = require('./index');

const dropTables = async () => {
  try {
    console.log('Starting to drop all tables...');
    await client.query(`
      DROP TABLE IF EXISTS users;
      `);

    console.log('Finished droppping all tables successfully!');
  } catch (error) {
    console.error('Error dropping tables');
    throw error;
  }
};

const createTables = async () => {
  try {
    console.log('Starting to create all tables...');
    await client.query(
      `
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
      );
      `
    );
    console.log(
      'Finished creating all tables successfully! Now, to add some data!'
    );
  } catch (error) {
    console.error('Error creating tables');
    throw error;
  }
};

async function createInitialUsers() {
  console.log('Starting to create users...');
  try {
    const usersToCreate = [
      { username: 'albert', password: 'bertie99' },
      { username: 'sandra', password: 'sandra123' },
      { username: 'glamgal', password: 'glamgal123' },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log('Users created:');
    console.log(users);
    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users!');
    throw error;
  }
}

(async () => {
  try {
    console.log('in rebuildDB: ', client);
    await dropTables();
    await createTables();
    await createInitialUsers();
    // client.release(() => console.log('client has been released'));
    console.log("Database has been rebuilt, and you're good to go!");
  } catch (error) {
    console.error('Error during rebuildDB', error);
    throw error;
  } finally {
    // client.end(() => console.log('pool has ended'));
  }
})();
