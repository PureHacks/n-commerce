/**
 * Author: Alin
 * Date: 05/10/13
 * Time: 11:05 AM
 * To change this template use File | Settings | File Templates.
 */

// get a connection to the DB
var db = require('../lib/storage').db
    , Category = require('../models/Category');


// create the Product model
var Product = db.model('Product', db.Schema({
  name: 'string',
  desc: 'string',
  price: 'number',
  image: 'string',
  sku: 'string',
  categories: db.Schema.Types.ObjectId,
  //categories: 'string',
  dateAdded: 'date',
  quantity: 'number',
  status: 'string'
}));

// export Product model
exports.Product = Product;