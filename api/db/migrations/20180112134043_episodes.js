
exports.up = function(knex, Promise) {
  return knex.schema.createTable('episodes', function(table) {
    table.increments();
    table.integer('tv_show_id').unsigned();
    table
      .foreign('tv_show_id')
      .references('id')
      .inTable('tv_shows');
    table.string('title').notNullable();
    table.date('air_date');
    table.string('summary');
    table.integer('runtime').notNullable().defaultTo(0);
    table.integer('season_number').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('episodes');
};
