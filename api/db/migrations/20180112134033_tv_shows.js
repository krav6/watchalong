
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tv_shows', function(table) {
    table.increments();
    table
      .string('thetvdb_id')
      .notNullable()
      .unique();
    table.string('imdb_id').unique();
    table.string('title').notNullable();
    table.date('release_date').notNullable();
    table.string('summary');
    table
      .integer('number_of_seasons')
      .notNullable()
      .defaultTo(0);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tv_shows');
};
