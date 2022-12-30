exports.up = function(knex) {
  return knex.schema.createTable('checklists', table => {
    table.increments('id').primary();
    table.string('text').notNullable();
    table.boolean('checked').defaultTo(false);
    table.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('checklists');
};