layout.controller("mapController",["$scope","$resource","uiGmapIsReady","$cordovaGeolocation", function($scope, $resource, uiGmapIsReady,$cordovaGeolocation) {
	$scope.map;
	$scope.readyForMap = true;
    $scope.control = {};
//    var mapOptions = {
//            zoom: 15,
//            center: new google.maps.LatLng(51.5033630 ,-0.1276250),
//            mapTypeId: google.maps.MapTypeId.TERRAIN
//        }
//    $scope.map=new google.maps.Map(document.getElementById('map'), mapOptions);
//    $scope.map.markers=[];
    
    var createMarker = function (info){
        
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.long),
            title: info.city
        });
        marker.content = '<div class="infoWindowContent">' + info.descricao + '</div>';
        
        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            infoWindow.open($scope.map, marker);
        });
        
        $scope.map.markers.push(marker);
        
    };
    uiGmapIsReady.promise().then(function (maps) {
       
    });
    getLocation();
	function getLocation() {
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(showPosition);
	    } else { 
	    	var posOptions = {timeout: 10000, enableHighAccuracy: true};
	    	$cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
	    		showPosition(position);
			}, function(err) {
			      
		    });
	    }
		
	}

	function showPosition(position) {
	    var mapOptions = {
	            zoom: 15,
	            center: new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
	            mapTypeId: google.maps.MapTypeId.TERRAIN
	        }
	    $scope.map=new google.maps.Map(document.getElementById('map'), mapOptions);
	    $scope.map.markers=[];
	    $scope.currentLocation=new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
	    setMarker($scope.map, $scope.currentLocation, 'Here', 'Your location','images/here.png');
	    $scope.start='"'+position.coords.latitude+","+position.coords.longitude+'"';
	    for (var x = 0; x < 50; x++) {
	    	setMarker($scope.map, new google.maps.LatLng(position.coords.latitude+((Math.random() / 20)),position.coords.longitude+((Math.random() / 20))), 'Sale'+x, 'Sale'+x,'images/farmstand.png');
	    }
	    $scope.readyForMap = true;
	    $scope.apply;
	}
    
	function setMarker(map, position, title, content) {
		setMarker(map, position, title, content, 'images/farmstand.png');
	}
	
	function setMarker(map, position, title, content,icon) {
        var marker;
        var markerOptions = {
            position: position,
            map: map,
            title: title,
            icon: icon
        };

        marker = new google.maps.Marker(markerOptions);
        marker.addListener('click', function() {
        	$("#loading").show();
            $scope.map.setZoom(15);
            $scope.map.setCenter(marker.getPosition());
            $scope.setDirection(position.L,position.H);
            $("#loading").hide();
        });

        $scope.map.markers.push(marker); // add marker to array
        
        google.maps.event.addListener(marker, 'click', function () {
            // close window if not undefined
            if (infoWindow !== void 0) {
                infoWindow.close();
            }
            // create new window
//            content: content+"<a href='http://waze.to/?ll="+position.L+","+position.H+"&navigate=yes' class='link-window-map' >" +
//    		"<img src='images/waze.png' class='img-map' /> Waze"+"</a>",
            var drive='<br/>'+'<a ng-click="setDirection('+position.L+','+position.H+')" >Drive</a>';
            var infoWindowOptions = {
                content: content+drive+'<img src="images/waze.png" onclick="wazeLink('+position.L+','+position.H+')" class="img-map" />',
                shadowStyle: 1,
                padding: 0,
                borderRadius: 5,
                arrowSize: 10,
                borderWidth: 1,
                borderColor: '#2c2c2c',
                disableAutoPan: true,
                hideCloseButton: false,
                arrowPosition: 30,
                backgroundClassName: 'transparent',
                arrowStyle: 2
            };
            var infoWindow = new InfoBubble(infoWindowOptions);
            infoWindow.open(map, marker);
        });

    }
	var directionsService = new google.maps.DirectionsService();
	var directionsDisplay = new google.maps.DirectionsRenderer();

	$scope.setDirection=function(Lat,Lng){
		var pos=new google.maps.LatLng(Lat, Lng);
		var end = pos.L + "," + pos.H;
		 var directionConfig={
				  origin: $scope.start,
				  destination: end,
				  travelMode: google.maps.TravelMode.DRIVING,
				  optimizeWaypoints: true,
				  unitSystem: google.maps.UnitSystem.METRIC
				};
		 directionsService.route(directionConfig, function(result, status) {
			 	console.clear();
			 	console.log(status);
			 	console.log($scope.start);
			 	console.log(pos);
			 	console.log(end);
			    if (status == google.maps.DirectionsStatus.OK) {
			      directionsDisplay.setDirections(result);
			    }
			  });
	 };
	
}]);

function wazeLink(L,H){
	window.open('http://waze.to/?ll='+L+','+H+'&z=10', '_blank' );
//	window.open('http://maps.google.com/maps?q='+L+','+H, '_blank' );	
}

function onDeviceReady() {
    
}

function onLoad(){
	document.addEventListener("deviceready", onDeviceReady, false);
}

