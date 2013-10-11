/**
 * Author: Alin
 * Date: 11/10/13
 * Time: 2:48 AM
 *
 * utility functions for paypal SDK
 */


/**
 * Creates a "payment" object for the PayPal SDK
 * @param payParams the data for payment
 */
exports.getPayment = function(payParams) {
  return {
    "intent": "sale",
    "payer": {
      "payment_method": "credit_card",
      "funding_instruments": [{
        "credit_card": {
          "number": payParams.number,
          "type": payParams.type,
          "expire_month": payParams.expire_month,
          "expire_year": payParams.expire_year,
          "cvv2": payParams.cvv2,
          "first_name": payParams.first_name,
          "last_name": payParams.last_name
        }
      }]
    },
    "transactions": [{
      "amount": {
        "total": (+(payParams.amount)).toFixed(2),
        "currency": "USD"
      },
      "description": "My awesome payment"
    }]
  }
};