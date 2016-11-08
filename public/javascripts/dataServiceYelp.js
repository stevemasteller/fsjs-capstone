(function() {
'use strict';

angular.module('app').service('dataServiceYelp', function($http) {
		
	var vm = this;

	vm.getYelp = function(title, lat, lng, callback, err) {
		$http.get('/api/yelp?title=' + title + '&lat=' + lat + '&lng=' + lng).then(callback, err);
	};
});

})();