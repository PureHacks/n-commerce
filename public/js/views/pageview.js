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
	
    	 		var userModel = new UserModel();
    	 		
    	 		var loginView = new LoginView({
    	 			model:userModel
    	 		});

    	 		var profileView = new ProfileView({
    	 			model:userModel
    	 		});

                this.checkForLoggedIn(userModel);
    	 	},
	
    	 	checkForLoggedIn : function(userModel) {

                var userID = $.cookie('rememberme');
                
                if(userID) {
                    userModel.fetch({
                        data: { id: userID }
                    });
                }
    	 	}
	
    	});
	
    	return new PageView();

    });

    
});