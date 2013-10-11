define([
    'jquery', 
    'underscore', 
    'backbone'
], 
function(
    $, 
    _, 
    Backbone
){
    
    var ProfileView = Backbone.View.extend({
    	
    	//el: '#profile',
        el: '#nav-sigin',

        events : {
            "click #toggle-signin"     : 'onToggleSubmitClick'
        },
     	
     	initialize: function() {
            
            this.listenTo(this.model, 'change', this.onUserUpdate);
     	},

        onToggleSubmitClick : function(e) {

            var loggedIn = this.model.get('loggedIn');

            if(loggedIn) {
               this.logoutUser();
            } else {
                $.fancybox($("#login-register"));
            }

            return false;
        },

        logoutUser : function() {

            var self = this;

            $.ajax({
                url : '/logout',
                type: 'get',
                dataType: 'json',
                success : $.proxy(self.onLogoutSuccess, self)
            });

        },

        onLogoutSuccess : function() {
            console.log('logout success');

            this.model.clear();
        },

        onUserUpdate : function(user) {

            var loggedIn = user.get('loggedIn');

            if(loggedIn) {

                this.$('#nav-sigin span.txt').text(user.get('lastName'));
                this.$('#toggle-signin').text(this.$('#toggle-signin').data('signout'));
                
            } else {

                this.$('#nav-sigin span.txt').text('Guest');
                this.$('#toggle-signin').text(this.$('#toggle-signin').data('signin'));
            }
        }

    });

    return ProfileView;
});