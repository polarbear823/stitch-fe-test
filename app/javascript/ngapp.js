var app = angular.module('products', []);
app.controller('ProductController', function($scope, $http, $window) {
  $http.get('/shopify/get?path=/admin/products.json').success(function(data) {
                    $scope.items = data;
                    $scope.products = $scope.items.products;
                    //console.log($scope.products);
                });
  $scope.selectProduct = function(productid) {
  	$http.get('/shopify/get?path=/admin/products/'+ productid+'.json').success(function(data) {
                    $scope.singleProduct = data['product'];
                    console.log($scope.singleProduct);
                });
  }
  $scope.deleteProduct = function(productid) {
  	$http.delete('/shopify/delete?path=/admin/products/'+ productid +'.json').success(function() {
                    $window.location.reload();
                    //console.log($scope.singleProduct);
                });
  }
})
//   $scope.addNewProduct = function() {
//   	$http.post('/shopify/post?path=/admin/products.json',{product:JSON.stringify($scope.formData)}).success(function(data) {
//                     $window.location.reload();
//                     console.log(data);
//                 });
//   }
// })
.filter("dateSearch", function() {
  return function(items, from, to) {
  		if(!items)
  			return;
  		function parseDate(input) {
		  var parts = input.split('-');
		  // Note: months are 0-based
		  return new Date(parts[0], parts[1]-1, parts[2]); 
		}
        var df = from ? parseDate(from) : new Date("1900-01-01");
        var dt = to ? parseDate(to) : new Date("2900-01-01");
        var arrayToReturn = [];
        //console.log(items);   
        for (var i=0; i<items.length; i++){
            var tf = new Date(items[i].created_at);
            if (tf > df && tf < dt)  {
                arrayToReturn.push(items[i]);
            }
        }
        return arrayToReturn;
  };
});