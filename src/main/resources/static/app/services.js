(function(angular) {
	var ProductFactory = function($resource) {
		return $resource('/products/:id', {
			id: '@id'
		}
//		, {
//			update: { method: "PUT" }
//			, remove: { method: "DELETE" }
//		}
		)
	};
	
	ProductFactory.$inject = ['$resource'];
	angular.module("grossApp.services").factory("Product", ProductFactory);
	
}(angular));

//(function(angular) {
//  var ItemFactory = function($resource) {
//    return $resource('/items/:id', {
//      id: '@id'
//    }, {
//      update: {
//        method: "PUT"
//      },
//      remove: {
//        method: "DELETE"
//      }
//    });
//  };
//  
//  ItemFactory.$inject = ['$resource'];
//  angular.module("myApp.services").factory("Item", ItemFactory);
//}(angular));