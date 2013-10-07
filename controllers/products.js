
var db = require('../lib/storage').db;
var Product = require('../models/Product').Product;
var ObjectId = require('mongoose').Types.ObjectId;

//var textSearch = require('mongoose-text-search');

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
      , productList: JSON.stringify(products)

    });
  };
};



exports.addProduct = function(req, res){
  var name = req.param('name');
  var desc = req.param('desc');

  // create instance of Product from req params
  var product = new Product({
    name: name,
    dec: desc
  });  //instance created

  product.save(function(err) {
    if(err) {
      //console.log('error saving product name: ' + product.name);
    }
    res.render('home',{
      title:'N-Commerce Home'
      , productName: product.name
      , productDesc: product.desc
      , productList: [product]
    });
  })
};






exports.searchProducts = function(req, res) {

  console.log("searchProducts: req.params=", req.params);

  var options = {
    project: ''                // do not include the `created` property
    , filter: { } // casts queries based on schema
    , limit: 100
    , lean: false
  }


  // this is the product controller
  var products = {};
  var searchTerm = req.params.searchTerm;

  console.log("searchTerm=", searchTerm);

  // products is response array
  Product.textSearch(searchTerm, options, function(err, products){

    console.log("textSearch products=",products);

    if(err) {
      console.log("err=" + err);
      renderResponse([]);
    } else {
      renderResponse(products);
    }
  });


  var renderResponse = function (products) {

    //console.log("id=", id, ", lenmgth=", products.length, "products=", products);
    //log("products=", products);
    res.render('productlist',{
      title:'product list'
      , productList: JSON.stringify(products)

    });
  };
};

