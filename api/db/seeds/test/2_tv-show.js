exports.seed = (knex, Promise) => {
  return knex('tv_shows')
    .del()
    .then(() => {
      return knex('tv_shows').insert({
        thetvdb_id: '1',
        imdb_id: '1',
        title:
          'ShowTitle1',
        release_date: '2017-01-01',
        summary: 'ShowSummary',
        runtime: 45,
        number_of_seasons: 1
      });
    });
};
