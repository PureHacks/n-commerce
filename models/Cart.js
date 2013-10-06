/**
 * Author: Alin
 * Date: 06/10/13
 * Time: 2:10 AM
 * To change this template use File | Settings | File Templates.
 */

// get a connection to the DB
var db = require('../lib/storage').db
  , Product = require('../models/Product').Product;


// create the Cart model
var Cart = db.model('Cart', db.Schema({
  products: [{ type: db.Schema.Types.ObjectId, ref: 'Product' }]
}));

// export Product model
exports.Cart = Cart;