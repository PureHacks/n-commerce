var LocalStrategy = require('passport-local').Strategy;
var User 		  = require('../models/User');

module.exports = function(passport, config) {

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findOne({ _id: id }, function (err, user) {
			done(err, user);
		});
	});

	passport.use(new LocalStrategy({
			usernameField : 'email'
		},
  		function(email, password, done) {
		
  			User.isValidUserPassword(email, password, done);
  		}
	));

}