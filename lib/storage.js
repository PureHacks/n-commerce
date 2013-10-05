/**
 * Author: Alin
 * Date: 05/10/13
 * Time: 9:03 AM
 */

var conf = require('../conf/conf').conf;

//tell node to get the "mongoose" module
// which connects the application to the mongodb database
var db = require('mongoose');
//connect to the "test" database
console.log('attempting connection to:' + conf.databaseHost);
db.connect(conf.databaseHost, conf.databaseName);

exports.db = db;