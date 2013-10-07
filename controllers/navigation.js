
var db = require('../lib/storage').db;
var Category = require('../models/Category').Category;
var ObjectId = require('mongoose').Types.ObjectId;

exports.getCategories = function(req, res) {

    console.log("1 req.params=", req.params);

    // this is the product controller
    var categories = {};
    var parentId = req.params.id;
  console.log("parentId= ",  parentId);

  var objParentId = new ObjectId(parentId);
  console.log("objParentId= ",  objParentId);

  // products is response array
  if(! parentId) {
    Category.find(function(err, categories){

        //console.log("findById products=",product, "id=",id);

        if(err) {
            renderResponse([]);
        } else {
            renderResponse(categories);
        }
    });
  } else {
    console.log("find by parent id ",  objParentId);
    Category.find({'parentId': objParentId}, function(err, categories){

      //console.log("findById products=",product, "id=",id);

      if(err) {
        renderResponse([]);
      } else {
        renderResponse(categories);
      }
    });
  }


    var renderResponse = function (categories) {

        //console.log("id=", id, ", lenmgth=", products.length, "products=", products);

        res.render('categories',{
            title:'Categories'
            , categories: JSON.stringify(categories)
        });
    };
};



exports.getCategoryInfo = function(req, res) {

  console.log("req.params=", req.params);

  // this is the product controller
  var category = {};

  var id = req.params.id;

   Category.findById(""+id, function(err, category){

      if(err) {
        renderResponse([]);
      } else {
        renderResponse(category);
      }
  });


  var renderResponse = function (category) {

    //console.log("id=", id, ", lenmgth=", products.length, "products=", products);

    res.render('category',{
      title:'category'
      , category: JSON.stringify(category)
    });
  };
};