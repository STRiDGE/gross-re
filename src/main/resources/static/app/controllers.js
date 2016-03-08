//(function(angular) {
//var AppController = function($scope, Item) {
//Item.query(function(response) {
//$scope.items = response ? response : [];
//});

//$scope.addItem = function(description) {
//new Item({
//description: description,
//checked: false
//}).$save(function(item) {
//$scope.items.push(item);
//});
//$scope.newItem = "";
//};

//$scope.updateItem = function(item) {
//item.$update();
//};

//$scope.deleteItem = function(item) {
//item.$remove(function() {
//$scope.items.splice($scope.items.indexOf(item), 1);
//});
//};
//};

//AppController.$inject = ['$scope', 'Item'];
//angular.module("myApp.controllers").controller("AppController", AppController);
//}(angular));
(function(angular) {
	var ProductController = function($scope, Product) {
		
		$scope.message = "Product controller";
		
		Product.query(function(response) {
			$scope.products = response ? response : [];
		});

		$scope.addProduct = function(name, category, measureAmount) {
			new Product({
				name: name
				, category: category
				, measureAmount: measureAmount
			}).$save(function(product) {
				$scope.products.push(product);
			});
			$scope.name = "";
			$scope.measureAmount = "";
		};

		$scope.updateProduct = function(product) {
			item.$update();
		};

		$scope.deleteProduct = function(product) {
			product.$remove(function() {
				$scope.products.splice($scope.products.indexOf(product), 1);
			});
		};

	};

	ProductController.$inject = ['$scope', 'Product'];
	angular.module("grossApp.controllers").controller("ProductController", ProductController);
	
	
	
	var MainController = function($scope) {
		$scope.message = "Main controller message";
	}
	angular.module("grossApp.controllers").controller("MainController", MainController);
	
	
}(angular));