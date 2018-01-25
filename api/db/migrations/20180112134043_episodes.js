
exports.up = (knex, Promise) => {
  return knex.schema.createTable('episodes', table => {
    table.increments();
    table.integer('tv_show_id').unsigned();
    table
      .foreign('tv_show_id')
      .references('id')
      .inTable('tv_shows');
      table.integer('season_number').notNullable();
    table.integer('episode_number').notNullable();
    table.unique(['tv_show_id', 'season_number', 'episode_number']);
    table.string('title').notNullable();
    table.string('summary', 1000);
    table.date('air_date');
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('episodes');
};
