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
    
    var User = Backbone.Model.extend({
    	
        defaults : {
            "isLoggedIn" : false
        }

    });

    return User;
});