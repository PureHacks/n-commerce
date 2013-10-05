
/**
 * Module dependencies.
 */
var express = require('express')
  , app = express()
  , controllers = require('./controllers')
  , http = require('http')
  , fs = require('fs')
  , path = require('path')
  , hbs = require('express-hbs'); //https://npmjs.org/package/express-hbs


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
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
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
app.post('/products', controllers.addProduct);

/*
// http://stackoverflow.com/questions/8864626/using-routes-in-express-js
//app.get('/product/:id', routes.product.list);

function(req, res){	
	console.log(req.params);
	var entry = blogEngine.getBlogEntry(req.params.id);
	res.render('article',{title:entry.title, blog:entry});
});


var products = require('./products');

exports.index = function(req, res){	
	console.log(req.params);
		
	var product = products.getProduct(req.params.id);
	res.render('product',{
		title: product.name
		, productName: product.name
		, productDesc: product.desc
	});
});


function(req, res){

	//var entry = blogEngine.getBlogEntry(req.params.id);
	var product = products.getProduct(3);
	//var productResults = products.getProduct();

	res.render('home',{
		title:'N-Commerce Home'
		, productName: product.name
		, productDesc: product.desc
		, productList:products.getProducts()
	});
};

*/

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

