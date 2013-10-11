define([
    'jquery', 
    'underscore', 
    'backbone',
    './pageview'
], 
function(
    $, 
    _, 
    Backbone,
    PageView
){

    	var HomePage = PageView.extend({
    		
    		el: 'body',
    	 	
    	 	initialize: function() {

                console.log('home', PageView, PageView.__super__.initialize);

	           // PageView.__super__.initialize.apply(this, arguments);
               PageView.prototype.initialize.apply(this, arguments);
               
               console.log('HomePage init');
    	 	}
	
    	});
	
    	return new HomePage();

    
});