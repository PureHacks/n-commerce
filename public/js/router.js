define([
	'jquery', 
    'underscore', 
    'backbone'
], 
function(
	$, 
    _, 
    Backbone, 
    Router
) {

	var AppRouter = Backbone.Router.extend({
    	routes: {
    	}
  	});

	var initialize = function() {

		var app_router = new AppRouter;

		console.log('route init');

		app_router.on('route:showHome', function() {
			console.log('show home page');
		});
	};

	return {
		initialize : initialize
	};

});