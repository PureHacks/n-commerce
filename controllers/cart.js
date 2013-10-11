/**
 * Author: Alin
 * Date: 06/10/13
 * Time: 2:02 AM
 */

var db = require('../lib/storage').db;
var Product = require('../models/Product').Product
  , Cart = require('../models/Cart').Cart;

exports.addToCart = function(req, res){
  var quantity = +(req.param('quantity') || 0)
    , productId = req.param('productId');

  // get user's cart and add the product to it if not there,
  //  or just update the quantity

  var user = req.isAuthenticated() ? req.user : false;
  if(user) {
    var cartId = user.cart;
    // add the product to cart
    Cart.findById(cartId)
      .populate('products')
      .exec(function(err, cart) {
        if(err) {
          //
          res.redirect('back');
        } else {
          // check if product is in cart
          var productToAddArray = cart.products.filter(function(product) {
            return product.id == productId;
          });

          // get the cart quantities and prepare for update
          var cartQuantities= {};
          if(cart.quantities.length > 0) {
            cartQuantities = cart.quantities[0];
            cart.quantities = [];
          }

          //if product exists in cart
          if(!productToAddArray.length) {
            // push product to cart
            cart.products.push(db.Types.ObjectId(productId));
            var quantityObject = {};
            cartQuantities['' + productId] = {
              productId: productId,
              quantity: (quantity || 1)
            };
            cart.quantities.push(cartQuantities);
            cart.save(function(err) {
              res.redirect('back');
            });
          } else {
            // just update the quantity
            var oldQuantity = cartQuantities['' + productId]['quantity'];
            cartQuantities['' + productId] = {
              productId: productId,
              quantity: (quantity + oldQuantity) >= 0 ? (quantity + oldQuantity) : 0
            };
            cart.quantities.push(cartQuantities);
            cart.save(function(err) {
              res.redirect('back');
            });
          }
        }
      });
  } else {
    res.redirect('back');
  }
};

exports.getCart = function(req, res) {
  var user = req.isAuthenticated() ? req.user : false;

  function getTotal(cart) {
    var total = 0;
    cart.products.forEach(function(product) {
      var quantity = cart.quantities[0]['' + product.id]['quantity'];
      total += (product.price * quantity);
    });
    return total.toFixed(2);
  };

	function renderResponse(cart, products) {
		res.render('cart', {
			title:'Your Shopping Cart'
			, productList: products
			, productsLength: cart.products.length
			, total: getTotal(cart)
		});
	};

  if(user) {
    Cart.findOne({_id:user.cart})
      .populate('products')
      .exec(function(err, cart) {
        if(err) {
          //
          renderResponse([], []);
        } else {
          var products = [];
          cart.products.forEach(function(product) {
            products.push({
              product: product,
              quantity: cart.quantities[0][''+product.id]['quantity']
            });
          });
          renderResponse(cart, products);
        }
      });
  } else {
    renderResponse([], []);
  }
};