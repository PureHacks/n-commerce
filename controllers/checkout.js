/**
 * Author: Alin
 * Date: 11/10/13
 * Time: 1:25 AM
 */

var db = require('../lib/storage').db;
var Product = require('../models/Product').Product
  , Cart = require('../models/Cart').Cart
  , conf = require('../conf/conf').conf
  , paypal_sdk = require('paypal-rest-sdk')
  , paypal_lib = require('../lib/paypal');


// configure the PayPal sdk
paypal_sdk.configure(conf.payPal.api);


/**
 * Renders the checkout page,
 * to collect user data for PayPal payments.
 */
exports.getCheckout = function(req, res){
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


/**
 * Makes a PayPal payment via credit cards.
 */
exports.makePayment = function(req, res) {

  var payParams = {
    amount: +(req.param('amount') || 0),
    first_name: req.param('first_name'),
    last_name: req.param('last_name'),
    number: req.param('number'),
    type: req.param('type'),
    expire_month: req.param('expire_month'),
    expire_year: req.param('expire_year'),
    cvv2: req.param('cvv2')
  };

  var payment = paypal_lib.getPayment(payParams);

  paypal_sdk.payment.create(payment, function (error, payment) {
    if (error) {
      console.log('\n\n--- PayPal error: ', error);
      renderResponse(cart, products);
    } else {
      req.session.paymentId = payment.id;
      res.render('create', { 'payment': payment });
    }
  });
};