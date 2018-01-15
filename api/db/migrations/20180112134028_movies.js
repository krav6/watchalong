exports.up = function(knex, Promise) {
  return knex.schema.createTable('movies', function(table) {
    table.increments();
    table
      .string('tmdb_id')
      .notNullable()
      .unique();
    table.string('imdb_id').unique();
    table.string('title').notNullable();
    table.date('release_date').notNullable();
    table.string('summary');
    table.integer('runtime').notNullable().defaultTo(0);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('movies');
};
