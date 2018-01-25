exports.up = (knex, Promise) => {
  return knex.schema.createTable('movies', table => {
    table.increments();
    table
      .string('tmdb_id')
      .notNullable()
      .unique();
    table.string('imdb_id').unique();
    table.string('title').notNullable();
    table.string('summary');
    table.date('release_date').notNullable();
    table.integer('runtime').notNullable().defaultTo(0);
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('movies');
};
