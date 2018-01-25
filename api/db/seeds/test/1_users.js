exports.seed = (knex, Promise) => {
  return knex('users')
    .del()
    .then(() => {
      return knex('users').insert({
        username: 'User001',
        email: 'user1@watchalong.com',
        password:
          '$2a$10$0FWSfVyy9A6fr5/13l8ChOcQ.PBvSnBOtN2dHB63ye5UEYYV68E1m', //password
        registration_date: '2017-01-01 12:53:00',
        karma: 0
      });
    })
    .then(() => {
      return knex('users').insert({
        username: 'User002',
        email: 'user2@watchalong.com',
        password:
          '$2a$10$0FWSfVyy9A6fr5/13l8ChOcQ.PBvSnBOtN2dHB63ye5UEYYV68E1m', //password
        registration_date: '2018-01-01 12:53:00',
        karma: -10
      });
    })
    .then(() => {
      return knex('users').insert({
        username: 'User003',
        email: 'user3@watchalong.com',
        password:
          '$2a$10$0FWSfVyy9A6fr5/13l8ChOcQ.PBvSnBOtN2dHB63ye5UEYYV68E1m', //password
        registration_date: '2017-05-04 17:32:10',
        karma: 43
      });
    })
    .then(() => {
      return knex('users').insert({
        username: 'User004',
        email: 'user4@watchalong.com',
        password:
          '$2a$10$0FWSfVyy9A6fr5/13l8ChOcQ.PBvSnBOtN2dHB63ye5UEYYV68E1m', //password
        registration_date: '2015-04-03 11:33:00',
        karma: 4324
      });
    });
};
