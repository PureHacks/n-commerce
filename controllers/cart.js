/**
 * Author: Alin
 * Date: 06/10/13
 * Time: 2:02 AM
 */

var db = require('../lib/storage').db;
var Product = require('../models/Product').Product
  , Cart = require('../models/Cart').Cart;

exports.addToCart = function(req, res){
  var quantity = req.param('quantity')
    , productId = req.param('productId');

  // get user's cart and add the product to it if not there,
  //  or just update the quantity

  var user = req.isAuthenticated() ? req.user : false;
  if(user) {
    var cartId = user.cart;
    // add the product to cart
    Cart.findOne({_id:cartId})
      .populate('products')
      .exec(function(err, cart) {
        if(err) {
          //
          res.redirect('back');
        } else {
          cart.products.push(db.Types.ObjectId(productId));
          cart.save(function(err) {
            res.redirect('back');
          });
        }
      });
  } else {
    res.redirect('back');
  }
};

exports.getCart = function(req, res) {
  var user = req.isAuthenticated() ? req.user : false;

  function getTotal(products) {
    var total = 0;
    products.forEach(function(product) {
      total += product.price;
    });
    return total.toFixed(2);
  };

  function renderResponse(products) {
    res.render('cart', {
      productList: products,
      productsLength: products.length,
      total: getTotal(products)
    });
  };

  if(user) {
    Cart.findOne({_id:user.cart})
      .populate('products')
      .exec(function(err, cart) {
        if(err) {
          //
          renderResponse([]);
        } else {
          renderResponse(cart.products);
        }
      });
  } else {
    renderResponse([]);
  }
};