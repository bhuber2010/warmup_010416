var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var knex = require('../db/knex');

/* GET users listing. */
router.get('/', function(req, res) {
  knex.select('number', 'name', 'position', 'age', 'college', 'exp')
    .from('players')
    .then(function(result){
      console.log(result);
      res.render('players', {title: 'Broncos', players: result})
    })
});

module.exports = router;
