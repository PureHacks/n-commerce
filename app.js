
/**
 * Module dependencies.
 */
var express = require('express')
  , app = express()
  , passport = require("passport")
  , authController = require('./controllers/auth')(passport)
  , controllers = require('./controllers')
  , productController = require('./controllers/products')
  , cartController = require('./controllers/cart')
  , navController = require('./controllers/navigation')
  , http = require('http')
  , fs = require('fs')
  , path = require('path')
  , hbs = require('express-hbs'); //https://npmjs.org/package/express-hbs


require('./lib/passport')(passport);	

// all environments
app.set('port', process.env.PORT || 3000);

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.compress());
app.use(express.bodyParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

/* cookies
  http://expressjs.com/api.html#res.cookie
  http://expressjs.com/api.html#req.signedCookies
*/
app.use(express.cookieParser('my secret'));
app.use(express.cookieSession({secret:'another secret', key: 'cookie.sid'}));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

console.log('What ENV are we in? '+app.get('env'));

app.use(require('less-middleware')({ 
  src: __dirname + "/public/less"
  , dest: __dirname + "/public/css"
  , compress:true
  , debug: (app.get('env')=='development')?true:false
  , force: (app.get('env')=='development')?true:false
  , prefix:'/css'
}));
app.use(express.static(path.join(__dirname, 'public')));


// Hook in express-hbs and tell it where known directories reside
app.engine('html', hbs.express3({
	partialsDir: __dirname + '/views/partials/',
	layoutsDir: __dirname + '/views/layouts/',
	defaultLayout: __dirname + '/views/layouts/main.html',
	extname:'.html'})
);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}



/* **********************
	controllers
************************/

// home page
app.get('/', controllers.index);

app.post('/login', authController.loginUser);
app.post('/register', authController.registerUser);

app.post('/product', productController.addProduct);
app.get('/product', productController.addProductPage)
app.get('/product/:id', productController.getProducts);

app.get('/cart', cartController.getCart);
app.post('/cart', cartController.addToCart);

app.get('/topcategories', navController.getCategories);

//page not found
app.use(function(req, res, next){
  res.send(404, '404 - Sorry cant find that!');
});

// 500 error page
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, '500 Something broke!');
});

http.createServer(app).listen(app.get('port'), function(){
  // in command line: node app
  console.log('Express server listening on port ' + app.get('port'));
});

