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
    	
    	el: '#profile',

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

                this.$('.greeting span').text(user.get('lastName'));
                this.$('#toggle-signin').text(this.$('#toggle-signin').data('signout'));
                
            } else {

                this.$('.greeting span').text('Guest');
                this.$('#toggle-signin').text(this.$('#toggle-signin').data('signin'));
            }
        }

    });

    return ProfileView;
});