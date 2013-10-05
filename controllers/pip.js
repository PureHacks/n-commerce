
/*
 * GET home page.

var products = require('./products');
var db = require('../lib/storage').db;
var Product = require('../models/Product').Product;

exports.index = function(req, res){ 

  console.log(req.params);
  
  var product = products.getProduct(req.params.id);
  

  Product.find(function(err, product) {
    if(err) {
      renderResponse([]);
    } else {
      renderResponse(products);
    }
  });

  var renderResponse = function (products) {
    if(!products.length) {
      products = [{name:'nameOne', desc: 'descOne'}];
    }

    res.render('pip',{
      title:'test'
      , productName: 'test name'
    });


    res.render('pip',{
      title:'test'
      , productName: products[0].name
      , productDesc: products[0].desc
      , productList: products
    });

  };

});

 */