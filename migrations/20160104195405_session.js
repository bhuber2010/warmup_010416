
exports.up = function(knex, Promise) {
  return knex.schema.createTable('session', function (table) {
    table.increments();

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('session')
};
