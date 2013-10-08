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
        
        url: '/user',
        
        defaults : {
            "isLoggedIn" : false
        },

        // sync : function(method, collection, options) {}

    });

    return User;
});