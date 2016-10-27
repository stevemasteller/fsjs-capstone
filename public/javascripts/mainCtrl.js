(function() {
'use strict';

angular.module('app').controller('mainCtrl', ['$scope', '$log', 'uiGmapGoogleMapApi', function ($scope, $log, GoogleMapApi) {
 
	angular.extend($scope, {
		
		map: 
		{
			center: 
			{
				latitude: 40.1451, 
				longitude: -99.6680  
			}, 
				zoom: 4 
		},
		searchbox: 
		{ 
			template:'searchbox.tpl.html', 
			events:
			{
				places_changed: function (searchBox) {
					
					
					var place = searchBox.getPlaces();
					
					if (!place || place == 'undefined' || place.length == 0) {
						console.log('no place data');
						return;
					}
					
					$scope.map = {
						"center": {
							"latitude": place[0].geometry.location.lat(),
							"longitude": place[0].geometry.location.lng()

						},
						"zoom": 18
					};
					
					$scope.marker = {
						id: 0,
						coords: {
							latitude: place[0].geometry.location.lat(),
							longitude: place[0].geometry.location.lng()
						}
					};
				}
			}
		},
		options: 
		{
			scrollwheel: false
		},
		marker:
		{
			id: 0,
			coords:
			{
				latitude: 40.1451,
				longitude: -99.6680
			}
		}
	});
		   
	GoogleMapApi.then(function(maps) {
		maps.visualRefresh = true;
	});
}]);

})();