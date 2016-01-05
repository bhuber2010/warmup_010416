var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var knex = require('../db/knex');

function ensureAuthenticated(req, res, next) {
  console.log("ensureAuthenticated",req.isAuthenticated());
  if (req.isAuthenticated()) { return next(); }
  res.render('index', { title: 'Please login!'});
}

/* GET users listing. */
router.get('/', function(req, res) {
  knex.select('number', 'name', 'position', 'age', 'college', 'exp')
    .from('players')
    .then(function(result){
      console.log(result);
      res.render('players', {title: 'Broncos', players: result})
    })
});

router.post('/new', ensureAuthenticated, function(req, res) {
  knex('players').insert({
    number: req.body.number,
    name:     req.body.name,
    position: req.body.position,
    age:      req.body.age,
    college:  req.body.college,
    exp:      req.body.exp
  })
  .then(function(result){
    res.redirect('/players');
  })
  .catch(function(error){
    res.json(error);
  })
})

module.exports = router;
