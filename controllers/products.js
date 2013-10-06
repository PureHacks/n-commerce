
var db = require('../lib/storage').db;
var Product = require('../models/Product').Product;
var ObjectId = require('mongoose').Types.ObjectId;

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


exports.getProductsByCategory = function(req, res) {

  console.log("getProductsByCategory: req.params=", req.params);

  // this is the product controller
  var products = {};
  var id = req.params.id;
  var objCategoryId = new ObjectId(id);

  // products is response array
  Product.find({ "categories":objCategoryId }, function(err, products){

    console.log("findByCat products=",products, "objCategoryId=",objCategoryId);

    if(err) {
      renderResponse([]);
    } else {
      renderResponse(products);
    }
  });


  var renderResponse = function (products) {

    //console.log("id=", id, ", lenmgth=", products.length, "products=", products);

    console.log("products=", products);
    res.render('productlist',{
      title:'product list'
      , productCount: products.length
      , productList: products

    });
  };
};