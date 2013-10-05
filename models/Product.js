/**
 * Author: Alin
 * Date: 05/10/13
 * Time: 11:05 AM
 * To change this template use File | Settings | File Templates.
 */

// get a connection to the DB
var db = require('../lib/storage').db;

// create the Product model
var Product = db.model('Product', db.Schema({
  name: 'string',
  desc: 'string'
}));

// export Product model
exports.Product = Product;