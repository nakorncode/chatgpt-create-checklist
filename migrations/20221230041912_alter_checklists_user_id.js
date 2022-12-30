exports.up = function(knex) {
  return knex.schema.alterTable('checklists', table => {
    table.string('userId').notNullable().references('id').inTable('users');
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('checklists', table => {
    table.dropColumn('userId');
  });
};