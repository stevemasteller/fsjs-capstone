(function() {
'use strict';

angular.module('app').controller('mainCtrl', ['$scope', '$log', 'uiGmapGoogleMapApi', "dataServicePlace", function ($scope, $log, uiGmapGoogleMapApi, dataServicePlace) {
	
	var vm = this;
	
	var mapEvents = {
		bounds_changed: function (arg) {
				vm.searchbox.options.bounds = arg.getBounds();
		}
	};
	
	vm.map = {
		"center": {
			"latitude": 40.1451,
			"longitude": -99.6680
		},
		"zoom": 4,
		"events": mapEvents,
		"refresh": {}
	}; //TODO:  set location based on users current gps location 

	vm.options = {
		"clickableIcons": true
	}
	
	vm.marker = {
		id: 0,
		coords: {
			latitude: 40.1451,
			longitude: -99.6680
		},
		options: {
			animation: null
		}
	};
	
//	function vm.searchbox.setbounds (bounds) {
//		vm.searchbox.bounds = bounds;
//	}
	
	var searchboxEvents = {
		places_changed: function (arg) {
			var place = arg.getPlaces();
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
				},
				options: {
					animation: null
				}
			};
		},
	};

	vm.searchbox = { template: 'searchbox.tpl.html', events: searchboxEvents, options: {} };

	vm.postHome = function() {
		console.log('reached mainCtrl putHome');
		dataServicePlace.postHome(vm.marker.coords, function(res) {
//			$location.path('/main.html');
		}, function(error) {
			vm.failure = true;
			vm.errorMessages = error.data.errors;
		});
	};

	vm.markers = [];
	vm.getPlaces = function() {
		console.log('reached mainCtrl getAll');
		dataServicePlace.getAll( function(res) {
			
			console.log('reached getAll response: ' + JSON.stringify(res));
			var data = res.data;
			console.log(data);
			var marker;
			for (var i = 0; i < data.length; i++) {
				marker = {
					id: data[i]._id,
					latitude: data[i].latitude,
					longitude: data[i].longitude,
					options: {
						animation: 1
					}
				};

				console.log("marker: " + marker);
				vm.markers.push(marker);
			}
				
		}, function(error) {
			console.log('error on getPlaces response');
			vm.failure = true;
			vm.errorMessages = error.data.errors;
		});
	};
	
	uiGmapGoogleMapApi.then(function(maps) {

		vm.onClick = function (marker, eventName, model) {
			console.log('clicked model :' + JSON.stringify(model));
			
			if(marker.options.animation !== null) {
				marker.options.animation = null;
			} else {
				marker.options.animation = 1;
			}
//			if(marker.getAnimation() !== null) {
//				marker.setAnimation(null);
//			} else {
//				marker.setAnimation(google.maps.Animation.BOUNCE);
//			}
//				console.log("marker animation: " + JSON.stringify(model));
		};
		
//		vm.$on('mapInitialized', function(event, eventMap) {
//			map = eventMap;
//
//			var mapMarker =  map.markers[0];
//			mapMarker.setAnimation(null);
//			marker = mapMarker;
//		});

//		$timeout(function(){
//			vm.map.control.refresh(vm.map.center);
//		},2000)		
	});
}]);

})();