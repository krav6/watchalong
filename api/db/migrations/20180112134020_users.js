exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments();
    table
      .string('username')
      .notNullable()
      .unique();
    table
      .string('email')
      .notNullable()
      .unique();
    table.string('password').notNullable();
    table.dateTime('registration_date').notNullable();
    table
      .integer('karma')
      .notNullable()
      .defaultTo(0);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
