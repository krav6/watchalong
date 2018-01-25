const knex = require('../db/knex');

const show = () => {
  return knex('tv_shows');
}

const getAll = () => {
  return show().select();
};

const exists = async thetvdb_id => {
  const shows = await getAll()
    .where('thetvdb_id', thetvdb_id)
    .count();

  return +shows[0].count > 0;
};

const insert = async (thetvdb_id, title, release_date, summary, runtime, number_of_seasons) => {
  return await knex
    .insert({ thetvdb_id, title, release_date, summary, runtime, number_of_seasons })
    .returning('id')
    .into('tv_shows');
};

module.exports = { getAll, exists, insert };
