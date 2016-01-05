var express = require('express');
var router = express.Router();
var passport = require('../modules/passport_config');
var knex = require('../db/knex');

// auth routes

// google
router.get('/google',
  passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    // insertUser(req.user);
    res.redirect('/players');
  });

//local
router.get('/login', function(req, res) {
  res.render('login', {});
});

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/auth/login' }),
  function(req, res) {
    // pull user off of req object

    res.redirect('/players');
  });

// app logout
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// insert user into users table
function insertUser(userObj) {
  knex('users').where('user_id', userObj.id)
  .then(function(user){
    if (user.length === 0) {
      return knex('users').insert({
        display_name: userObj.displayName,
        user_id:      userObj.id,
        provider:     userObj.provider,
        times_seen:   1
      })
    } else {
      return knex('users').where('user_id', user[0].user_id).increment('times_seen', 1)
    }
  })
  .then(function(result){
    console.log(result)
  })
  .catch(function(error){
    console.error(error);
  })
}

module.exports = router;
