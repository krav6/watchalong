
exports.up = (knex, Promise) => {
  return knex.schema.createTable('episode_chat_messages', table => {
    table.increments();
    table.integer('user_id').unsigned();
    table
      .foreign('user_id')
      .references('id')
      .inTable('users');
    table.integer('tv_show_id').unsigned();
    table
      .foreign('tv_show_id')
      .references('id')
      .inTable('tv_shows');
    table.string('text').notNullable();
    table
      .timestamp('timestamp')
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .integer('score')
      .unsigned()
      .notNullable()
      .defaultTo(0);
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('episode_chat_messages');
};
