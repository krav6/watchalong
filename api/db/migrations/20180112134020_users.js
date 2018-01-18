exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', table => {
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

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users');
};
