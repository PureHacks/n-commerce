
/*
 * GET home page.
 */
var products = require('./products');

exports.index = function(req, res){

	//set cookie - http://expressjs.com/api.html#res.cookie
	res.cookie('test', 'cookie value josh', {signed: true});
	
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
