const knex = require('../db/knex');

const episode = () => {
  return knex('episodes');
};

const getAll = () => {
  return episode().select();
};

const exists = async (tv_show_id, season_number, episode_number) => {
  const episodes = await getAll()
    .where('tv_show_id', tv_show_id)
    .andWhere('season_number', season_number)
    .andWhere('episode_number', episode_number)
    .count();

  return +episodes[0].count > 0;
};

const insert = async (
  tv_show_id,
  season_number,
  episode_number,
  title,
  air_date,
  summary
) => {
  return await knex
    .insert({
      tv_show_id,
      season_number,
      episode_number,
      title,
      air_date,
      summary
    })
    .returning('id')
    .into('episodes');
};

module.exports = { getAll, exists, insert };
