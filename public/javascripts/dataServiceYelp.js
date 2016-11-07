(function() {
'use strict';

angular.module('app').service('dataServiceYelp', function($http) {
		
	var vm = this;

	vm.getYelp = function(data, callback, err) {
		console.log('reached getYelp: ' + data);
		$http.put('/api/yelp/', data).then(callback, err);
	};
});

})();