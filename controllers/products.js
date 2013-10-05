var products = [{"id":1, "name":"Product 1", "desc":"Product 1 description"},{"id":2, "name":"Product 2", "desc":"Product 2 description"},{"id":3, "name":"Product 3", "desc":"Product 3 description"},{"id":4, "name":"Product 4", "desc":"Product 4 description"}];


exports.getProducts = function() {
   return products;
}
 
exports.getProduct = function(id) {
   for(var i=0; i < products.length; i++) {
      if(products[i].id == id) return products[i];
   }
}