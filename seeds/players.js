
exports.seed = function(knex, Promise) {
  var tblName = 'players';

  var rows = [
    {number: 17, name: 'Osweiler, Brock', position: 'QB', age: '25', college: 'Arizona State', exp: '4'},
    {number: 18, name: 'Manning, Peyton', position: 'QB', age: '39', college: 'Tennessee', exp: '18'},
    {number: 25, name: 'Harris Jr., Chris', position: 'CB', age: '26', college: 'Kansas', exp: '4'},
    {number: 88, name: 'Thomas, Demaryius', position: 'WR', age: '28', college: 'Georgia Tech', exp: '6'}
  ]

  return knex(tblName)
    .del()
    .then(function(){
      return knex.insert(rows).into(tblName)
    })
};
