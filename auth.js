var db = require('./db/api')
var bcrypt = require('bcrypt')
var passport = require('passport')
var localStrategy = require('passport-local')

passport.use(new localStrategy(function (username, password, done){
  db.findUserByName(username).then(function(user){
    if(!user){
      done("error: user does not exist", null)
      //done is a verify callback designed to find user with set of credentials
    } else if (user && bcrypt.compareSync(password, user.password)){
      done(null, user)
    } else {
      done('Error: Password is incorrect')
    }
  })
}))

module.exports = {
  passport: passport,

  createUser: function (body){
    var hash = bcrypt.hashSync(body.password, 8)
    body.password = hash
    return db.createUser(body).then(function (id){
      return id[0]
    })
  },
  
  isLoggedIn: function (req, res, next) {
    if(req.session.userId) {
      res.redirect('/home')
    } else {
      next ()
    }
  }
}
