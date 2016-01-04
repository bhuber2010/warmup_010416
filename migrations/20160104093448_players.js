
exports.up = function(knex, Promise) {
  return knex.schema.createTable('players', function (table) {
    table.increments();
    table.integer('number');
    table.string('name');
    table.string('position');
    table.integer('age');
    table.string('college');
    table.integer('exp');
    table.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('players')
};
