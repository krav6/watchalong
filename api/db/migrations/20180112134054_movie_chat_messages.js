exports.up = (knex, Promise) => {
  return knex.schema.createTable('movie_chat_messages', table => {
    table.increments();
    table.integer('user_id').unsigned();
    table
      .foreign('user_id')
      .references('id')
      .inTable('users');
    table.integer('movie_id').unsigned();
    table
      .foreign('movie_id')
      .references('id')
      .inTable('movies');
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
  return knex.schema.dropTable('movie_chat_messages');
};
