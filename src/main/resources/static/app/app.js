//(function(angular) {
//	angular.module("myApp.controllers", []);
//	angular.module("myApp.services", []);
//	angular.module("myApp", ["ngResource", "myApp.controllers", "myApp.services"]);
//}(angular));
(function(angular) {
	angular.module("grossApp.controllers", []);
	angular.module("grossApp.services", []);
	var grossApp = angular.module("grossApp", ["ngResource", "ngRoute", "grossApp.controllers", "grossApp.services"]);
	
	grossApp.config(function($routeProvider){
		$routeProvider
			.when("/", {
				templateUrl: "home.html"
				, controller: "MainController"
			})
			.when("/product", {
				templateUrl: "product.html"
				, controller: "ProductController"
			})
			.otherwise({
				redirectTo: "/"
			})			
			;
	});
}(angular));