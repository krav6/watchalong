
exports.up = (knex, Promise) => {
  return knex.schema.createTable('episodes', table => {
    table.increments();
    table.integer('tv_show_id').unsigned();
    table
      .foreign('tv_show_id')
      .references('id')
      .inTable('tv_shows');
    table.integer('episode_number').notNullable();
    table.string('title').notNullable();
    table.date('air_date');
    table.string('summary', 1000);
    table.integer('season_number').notNullable();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('episodes');
};
