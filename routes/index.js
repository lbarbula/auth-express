var express = require('express');
var router = express.Router();
var db = require('../db/api')
var auth = require('../auth')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next){
  res.render('/')
})

router.get('/signup', function(req, res, next){
  res.render('signup')
})

router.post('/signup', function(req, res, next){
  db.findUserByName(req.body.username).then(function (id) {
    if (id) {
      res.render('signup', {error: 'Username is taken'})
    } else {
        auth.createUser(req.body).then(function (id) {
          req.session.userId = id
          res.render('/home')
      })
    }
  })
})

router.post('/login', function(req, res, next){
  db.findUserByName(req.body.username).then(function (id) {
    if (id) {
      req.session.userID = id
      res.redirect('/home')
  } else {
      res.render('/login', {error: 'Username or password does not exist'})
    }
  })
})
module.exports = router;
