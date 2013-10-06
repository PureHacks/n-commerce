/**
 * Author: Alin
 * Date: 05/10/13
 * Time: 11:05 AM
 * To change this template use File | Settings | File Templates.
 */

// get a connection to the DB
var db = require('../lib/storage').db;

// create the Product model
var Category  = db.model('Category', db.Schema({

    name: 'string',
    desc: 'string',
    parentId:  [Category]
}));

// export Product model
exports.Category = Category;