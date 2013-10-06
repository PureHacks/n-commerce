
var db = require('../lib/storage').db;
var Product = require('../models/Product').Product;


exports.getProducts = function(req, res) {

	console.log("req.params=", req.params);

	// this is the product controller
	var products = {};
	var id = req.params.id;

	// products is response array
	Product.findById(""+id, function(err, product){

		//console.log("findById products=",product, "id=",id);

		if(err) {
			renderResponse([]);
	    } else {
			renderResponse(product);
	    }
	});


	var renderResponse = function (product) {
	   
	   	//console.log("id=", id, ", lenmgth=", products.length, "products=", products);

	    res.render('pip',{
	      title:product.name
        , productId: product._id
        , productName: product.name
        , productDesc: product.desc
        , productPrice: product.price
        , productImage: product.image
        , productSku: product.sku
        , productDateAdded: product.dateAdded
        , productQuantity: product.quantity
        , productStatus: product.status
      });
  	};
};

exports.addProduct = function(req, res){
  var name = req.param('name');
  var desc = req.param('desc');
  var price = +(req.param('price'));
  var image = req.param('image');
  var sku = req.param('sku');
  // TODO create te categories logic
  // var categories = req.param('categories');
  var dateAdded = new Date();
  var quantity = req.param('quantity');
  // TODO change the hardcoded ACTIVE status
  var status = 'active';

  // create instance of Product from req params
  var product = new Product({
    name: name,
    desc: desc,
    price: price,
    image: image,
    sku: sku,
    categories: null,
    dateAdded: dateAdded,
    quantity: quantity,
    status: status
  });  //instance created

  product.save(function(err) {
    if(err) {
      //console.log('error saving product name: ' + product.name);
    }
    res.render('home',{
      title:'N-Commerce Home'
      , productName: ''
      , productDesc: ''
      , productList: []
    });
  })
};

exports.addProductPage = function(req, res) {
  res.render('addProduct',{
    title:'N-Commerce Add Product'
  });
}