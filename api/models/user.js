const knex = require('../db/knex');

function users() {
  return knex('users');
}

// *** queries *** //

const getAll = () => {
  return users().select();
};

const exists = async (username, email) => {
  const users = await getAll()
    .where('username', username)
    .orWhere('email', email).count();

  return +users[0].count > 0;
};

const insert = async(username, email, password) => {
  return await knex.insert({ username, email, password, registration_date: new Date() }).returning('id').into('users');
}

module.exports = { getAll, exists, insert };
