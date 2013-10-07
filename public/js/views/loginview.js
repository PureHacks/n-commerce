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
    
    var LoginView = Backbone.View.extend({
    	
    	el: '#login-register',

        events : {
            "submit #login form"     : 'onLoginSubmit',
            "submit #register form"  : 'onRegisterSubmit'
        },
     	
     	initialize: function() {
            console.log('inseide', this.model);
     	},

        onLoginSubmit : function(e) {

            e.preventDefault();

            var self = this;

            $.ajax({
                url : '/login',
                type: 'post',
                dataType: 'json',
                data: {
                    email: this.$('#login input[name="email"]').val(), 
                    password: this.$('#login input[name="password"]').val()
                },
                success : $.proxy(self.onSubmitSuccess, self),
                error : $.proxy(self.onSubmitError, self)
            });
        },

        onRegisterSubmit : function(e) {

            e.preventDefault();

            var self = this;

            $.ajax({
                url : '/register',
                type: 'post',
                dataType: 'json',
                data: {
                    firstName: this.$('#register input[name="firstName"]').val(), 
                    lastName: this.$('#register input[name="lastName"]').val(), 
                    email: this.$('#register input[name="email"]').val(), 
                    password: this.$('#register input[name="password"]').val()
                },
                success : $.proxy(self.onSubmitSuccess, self),
                error : $.proxy(self.onSubmitError, self)
            });

        },

        onSubmitSuccess : function(data) {

            if(data.error) {
                this.onSubmitError(data.error);
                return;
            }

            $.fancybox.close();
            
            this.model.set({
                id : data.id,
                lastName : data.lastName,
                email: data.email,
                loggedin : true
            });
        },

        onSubmitError : function(error) {
            alert(error);
        }

    });

    return LoginView;
});