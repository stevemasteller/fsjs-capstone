(function() {
'use strict';

angular.module('app').controller('mainCtrl', ['$scope', '$log', 'uiGmapGoogleMapApi', "dataServicePlace", function ($scope, $log, GoogleMapApi, dataServicePlace) {
	
	var vm = this;
	
	vm.map = {
		"center": {
			"latitude": 40.1451,
			"longitude": -99.6680
		},
		"zoom": 4
	}; //TODO:  set location based on users current gps location 

	vm.marker = {
		id: 0,
		coords: {
			latitude: 40.1451,
			longitude: -99.6680
		}
	};

	var events = {
		places_changed: function (searchBox) {
			var place = searchBox.getPlaces();
			if (!place || place == 'undefined' || place.length == 0) {
				console.log('no place data :(');
				return;
			}

			vm.map = {
				"center": {
					"latitude": place[0].geometry.location.lat(),
					"longitude": place[0].geometry.location.lng()
				},
				"zoom": 18
			};
			
			vm.marker = {
				id: 0,
				coords: {
					latitude: place[0].geometry.location.lat(),
					longitude: place[0].geometry.location.lng()
				}
			};
		}
	};

	vm.searchbox = { template: 'searchbox.tpl.html', events: events };

	vm.postHome = function() {
		console.log('reached mainCtrl putHome');
		dataServicePlace.postHome(vm.marker.coords, function(res) {
//			$location.path('/main.html');
		}, function(error) {
			vm.failure = true;
			vm.errorMessages = error.data.errors;
		});
	};


}]);

})();