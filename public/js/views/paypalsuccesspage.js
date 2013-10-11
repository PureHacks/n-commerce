define([
    'jquery', 
    'underscore', 
    'backbone',
    'views/pageview'
], 
function(
    $, 
    _, 
    Backbone,
    PageView
){

    	var PayPalSuccess = PageView.extend({
    		
    		el: 'body',
    	 	
    	 	initialize: function() {

                
	           PageView.__super__.initialize.apply(this, arguments);

               console.log('PayPalSuccess init');
    	 	}
	
    	});

    return new PayPalSuccess();
    
});