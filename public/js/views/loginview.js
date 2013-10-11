define([
    'jquery', 
    'underscore', 
    'backbone',
    'jquery.validate'
], 
function(
    $, 
    _, 
    Backbone
){
    var validator;

    //domready
    $(function() {

        $("#login form").validate({
            showErrors : function(errorMap, errorList) {

                $('form input').removeClass('error');

                for(var i = 0; i < errorList.length; i++) {
                    var result = errorList[i];
                    $(result.element).addClass('error');
                }
            }
        });

        $("#register form").validate({
            showErrors : function(errorMap, errorList) {

                $('form input').removeClass('error');

                for(var i = 0; i < errorList.length; i++) {
                    var result = errorList[i];
                    $(result.element).addClass('error');
                }
            }
        });

    });

    var LoginView = Backbone.View.extend({
    	
    	el: '#login-register',

        events : {
            "submit #login form"     : 'onLoginSubmit',
            "submit #register form"  : 'onRegisterSubmit'
        },
     	
     	initialize: function() {
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

            this.model.save({
                firstName: this.$('#register input[name="firstName"]').val(), 
                lastName: this.$('#register input[name="lastName"]').val(), 
                email: this.$('#register input[name="email"]').val(), 
                password: this.$('#register input[name="password"]').val()
            }, 
            {
                wait: true,
                success: function(model, xhr) {
                    if(xhr.error) { alert(xhr.error); return; }
                    $.fancybox.close();
                }
            });

        },

        onSubmitSuccess : function(data) {

            if(data.error) {
                this.onSubmitError(data.error);
                return;
            }

            $.fancybox.close();
            
            this.model.set(data);
        },

        onSubmitError : function(error) {
            alert(error);
        }

    });

    return LoginView;
});