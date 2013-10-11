/**
 * Author: Alin
 * Date: 11/10/13
 * Time: 1:25 AM
 */

//checkoutController.checkout

var db = require('../lib/storage').db;
var Product = require('../models/Product').Product
  , Cart = require('../models/Cart').Cart;

exports.getCheckout = function(req, res){
  var quantity = +(req.param('quantity') || 0)
    , productId = req.param('productId');


  var user = req.isAuthenticated() ? req.user : false;

  function getTotal(cart) {
    var total = 0;
    cart.products.forEach(function(product) {
      var quantity = cart.quantities[0]['' + product.id]['quantity'];
      total += (product.price * quantity);
    });
    return total.toFixed(2);
  };

  function renderResponse(cart) {
    var totalCart = getTotal(cart);
    res.render('checkout', {
      title:'Checkout'
      , amount: totalCart
      , taxes: (+(totalCart * 0.13)).toFixed(2)
      , shipping: (+(totalCart * 0.1)).toFixed(2)
      , total: (+(totalCart * 1.23)).toFixed(2)
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
          renderResponse(cart);
        }
      });
  } else {
    renderResponse([]);
  }

};

var cc = {
  "intent": "sale",
  "payer": {
    "payment_method": "credit_card",
    "funding_instruments": [{
      "credit_card": {
        "number": "5500005555555559",
        "type": "mastercard",
        "expire_month": 12,
        "expire_year": 2018,
        "cvv2": 111,
        "first_name": "Joe",
        "last_name": "Shopper"
      }
    }]
  },
  "transactions": [{
    "amount": {
      "total": 20,
      "currency": "USD"
    },
    "description": "My awesome payment"
  }]
}