exports.up = (knex, Promise) => {
  return knex.schema.createTable('tv_shows', table => {
    table.increments();
    table
      .string('thetvdb_id')
      .notNullable()
      .unique();
    table.string('imdb_id').unique();
    table.string('title').notNullable();
    table.date('release_date').notNullable();
    table.string('summary', 1000);
    table
      .integer('runtime')
      .notNullable()
      .defaultTo(0);
    table
      .integer('number_of_seasons')
      .notNullable()
      .defaultTo(0);
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('tv_shows');
};
