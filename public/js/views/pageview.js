define([
    'jquery', 
    'underscore', 
    'backbone',
    'models/user',
    'views/loginview',
    'views/profileview',
    'jquery.cookie',
    'fancybox'
], 
function(
    $, 
    _, 
    Backbone,
    UserModel,
    LoginView,
    ProfileView
){
    
    $(function() {

    	var PageView = Backbone.View.extend({
    		
    		el: 'body',
    	 	
    	 	initialize: function() {
	
    	 		// $.cookie.json = true;
	
    	 		var userModel = this.initUser();
    	 		
    	 		var loginView = new LoginView({
    	 			model:userModel
    	 		});

    	 		var profileView = new ProfileView({
    	 			model:userModel
    	 		});
    	 	},
	
    	 	initUser : function() {
				
				// var userCookie = $.cookie('cookie.sid');
	
    	 		// console.log('cookie', userCookie);

				return new UserModel();
    	 		
    	 	}
	
    	});
	
    	return new PageView();

    });

    
});