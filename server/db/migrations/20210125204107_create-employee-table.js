exports.up = async function(knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await knex.schema.createTable('employee', (table) => {
    table
      .uuid('id')
      .primary()
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').notNullable().unique();
    table.string('gender').notNullable();
    table.string('mobile', 10).notNullable();
    table.string('image_url').nullable();
    table.string('department').notNullable();
    table.string('job_profile').notNullable();
    table.float('salary').notNullable();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable('employee');
};
