require.config({

    baseUrl: "/js", // generally the same directory as the script used in a data-main attribute for the top level script
    
    paths: {
        'jquery': '../bower_components/jquery/jquery',
    	'jquery.cookie': '../bower_components/jquery.cookie/jquery.cookie',
        'underscore': '../bower_components/underscore/underscore',
        'backbone': '../bower_components/backbone/backbone',
        'fancybox': '../bower_components/fancybox/source/jquery.fancybox',
        'jquery.validate': '../bower_components/jquery.validation/jquery.validate'
    },

    shim: {
        'underscore': {
          exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'jquery.cookie': {
            deps: ['jquery']
        },
        'fancybox' : {
            deps: ['jquery']
        },
        'jquery.validate' : {
            deps: ['jquery']
        }
    }

});