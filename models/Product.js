/**
 * Author: Alin
 * Date: 05/10/13
 * Time: 11:05 AM
 * To change this template use File | Settings | File Templates.
 */

// get a connection to the DB


var db = require('../lib/storage').db
    , Category = require('../models/Category')
    , textSearch = require('mongoose-text-search');;


var productSchema = db.Schema({
  name: 'string',
  desc: 'string',
  price: 'number',
  image: 'string',
  sku: 'string',
  categories: db.Schema.Types.ObjectId,
  dateAdded: 'date',
  quantity: 'number',
  status: 'string'
});

productSchema.plugin(textSearch);

productSchema.index({name :'text'});



// create the Product model
var Product = db.model('Product', productSchema);

// export Product model
exports.Product = Product;