
var db = require('../lib/storage').db;
var Category = require('../models/Category').Category;


exports.getCategories = function(req, res) {

    console.log("req.params=", req.params);

    // this is the product controller
    var categories = {};
    var id = req.params.id;

    // products is response array
    Category.find(function(err, categories){

        //console.log("findById products=",product, "id=",id);

        if(err) {
            renderResponse([]);
        } else {
            renderResponse(categories);
        }
    });


    var renderResponse = function (categories) {

        //console.log("id=", id, ", lenmgth=", products.length, "products=", products);

        res.render('categories',{
            title:'Categories'
            , categorieslength: categories.length
        });
    };
};