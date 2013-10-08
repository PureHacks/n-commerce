// get a connection to the DB
var db 	 = require('../lib/storage').db
  , hash = require('../lib/hash')
  , Cart = require('../models/Cart').Cart;


var UserSchema = db.Schema({
	firstName:  String,
	lastName:   String,
	email:      String,
	salt:       String,
	hash:       String,
  cart:       { type: db.Schema.Types.ObjectId, ref: 'Cart' }
});


UserSchema.statics.isValidUserPassword = function(email, password, done) {
	this.findOne({email : email}, function(err, user){
		
		if(err) return done(err);
		if(!user) return done(null, false, { message : 'Incorrect email.' });

		hash(password, user.salt, function(err, hash){
			if(err) return done(err);
			if(hash == user.hash) return done(null, user);
			done(null, false, {
				message : 'Incorrect password'
			});
		});
	});
};

UserSchema.statics.signup = function(email, password, fname, lname, done){
	
	var User = this;
	
	hash(password, function(err, salt, hash) {
		
		if(err) throw err;
		if (err) return done(err);

    Cart.create({
      products: []
    }, function(err, cart) {
      if(err) {
        cart = null
      }
      User.create({
        firstName : fname,
        lastName : lname,
        email : email,
        salt : salt,
        hash : hash,
        cart: (cart ? [db.Types.ObjectId(cart.id)] : null)
      }, function(err, user){

        if (err) return done(err);
        done(null, user);
      });
    });
	});
};


UserSchema.statics.getByEmail = function(email, done) {

	this.findOne({email : email})
    .populate('cart')
    .exec(function(err, user) {
      console.log('gotByEmail: ', user);
      done(err, user);
    });
};

UserSchema.statics.getById = function(id, done) {

	this.findOne({ _id: id })
    .populate('cart')
    .exec(function(err, user) {
      console.log('getById: ', user, id);
      done(err, user);
    });
};

/*


UserSchema.statics.findOrCreateFaceBookUser = function(profile, done){
	var User = this;
	this.findOne({ 'facebook.id' : profile.id }, function(err, user){
		if(err) throw err;
		// if (err) return done(err);
		if(user){
			done(null, user);
		}else{
			User.create({
				email : profile.emails[0].value,
				facebook : {
					id:    profile.id,
					email: profile.emails[0].value,
					name:  profile.displayName
				}
			}, function(err, user){
				if(err) throw err;
				// if (err) return done(err);
				done(null, user);
			});
		}
	});	
}
*/

var User = db.model("User", UserSchema);
module.exports = User;