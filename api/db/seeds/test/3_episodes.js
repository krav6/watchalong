exports.seed = (knex, Promise) => {
  return knex('episodes')
    .del()
    .then(() => {
      return knex('episodes').insert({
        tv_show_id: '1',
        episode_number: '1',
        season_number: '1',
        air_date: '2017-01-02',
        summary: 'EpisodeSummary',
        title: 'EpisodeTitle1'
      });
    })
    .then(() => {
      return knex('episodes').insert({
        tv_show_id: '1',
        episode_number: '2',
        season_number: '1',
        air_date: '2017-01-03',
        summary: 'EpisodeSummary',
        title: 'EpisodeTitle2'
      });
    })
    .then(() => {
      return knex('episodes').insert({
        tv_show_id: '1',
        episode_number: '1',
        season_number: '0',
        air_date: '2017-01-01',
        summary: 'EpisodeSummary',
        title: 'SpecialEpisodeTitle1'
      });
    });
};
