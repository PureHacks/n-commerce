var User = require('../models/User');

module.exports = function(passport) {

	return {
		loginUser : function(req, res, next) {

			passport.authenticate('local', function(err, user, info) {
		
				if(req.xhr) {
		
					if (err) { return res.json({ error: err.message }); }
					if (!user) { return res.json({error : "Invalid Login"}); }
		
					login(req, res, user);
					
		
				} else {
					//non ajax request response would go here
				}
		
			})(req, res, next);
		},

		logoutUser : function(req, res, next) {

			//remove logged in cookie
			res.clearCookie('rememberme');

			req.logout();
			return res.json({logout:'success'});
		},

		registerUser : function(req, res) {

			var email = req.param('email'),
				pass  = req.param('password'),
				fname = req.param('fristName'),
				lname = req.param('lastName');
		
			User.getByEmail(email, function(err, user) {
		
				if(!user) {
		
					User.signup(email, pass, fname, lname, function(err, user){
						
						if (err) { return res.json({ error: err.message }); }
						
						login(req, res, user);
					});
		
				} else {
		
					return res.json({ error: "User with this email already exists" });	
				}
			});

		},

		getUser : function(req, res) {

			var id 		     = req.param('id') || -1,
				loggedInUser = req.isAuthenticated() ? req.user : false;


			User.getById(id, function(err, user) {

				var userIsLoggedIn = loggedInUser ? (loggedInUser.id == user.id) : false;

				var response = user ? {
					firstName: user.firstName,
					lastName: user.lastName,
					id: user.id,
					email: user.email,
					loggedIn: userIsLoggedIn
				} : { error: 'user not found.' };

				res.json(response);
			});
		}
	}
};


function login(req, res, user) {

	req.login(user, function(err) {

		if (err) { return res.json({error:err}); }

		var user = {
			firstName: req.user.firstName,
			lastName: req.user.lastName,
			id: req.user.id,
			email: req.user.email,
			loggedIn: true
		};

		//set cookie to remember logged in user
		res.cookie('rememberme', req.user.id, { /*maxAge: 900000,*/ httpOnly: false });

		return res.json(user);
	});
}