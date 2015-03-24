var myMap;
var locationLayer = new google.maps.Data();
var audioLayer = new google.maps.Data();

locationMarkers = [];
locationInfos = [];

function initializeNearbyAudioMap() {
  var mapOptions = {
    zoom: 18,
    center: new google.maps.LatLng(Number(myPosition.coords.latitude), Number(myPosition.coords.longitude) )
  };
  myMap = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  google.maps.event.addListenerOnce(myMap, 'idle', function(){
      // do something only the first time the map is loaded
      addAudioToMap(recordings);
      addLocsToMap(nearbyLocations);
  });
}

function addAudioToMap(pinArray) {
  console.log('adding audio to map');
  alert('adding ' + recordings.length + ' recs to map');
}

function addLocsToMap(locs) {
  console.log('we have ' + nearbyLocations.length + ' nearby locations');

  audioLayer = {"locations": [] };

  for (var i = 0; i < nearbyLocations.length; i++) {
    audioLayer.locations.push([nearbyLocations[i].name, nearbyLocations[i].location.lat, nearbyLocations[i].location.lng ])
  }

  // myMap.data = audioLayer;
  setMarkers(myMap, audioLayer.locations);
}


function setMarkers(map, locations) {
  console.log('setting markers');

  locationInfos = [];
  locationMarkers = [];

  for (var i = 0; i < locations.length; i++) {
    var loc = locations[i];
    var myLatLng = new google.maps.LatLng(loc[1], loc[2]);
    locationMarkers.push ( new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: loc[0],
      index: i
    }) );

    locationInfos.push(new google.maps.InfoWindow({
      content: loc[0]
    }) );

    google.maps.event.addListener(locationMarkers[i], 'mousedown', function() {
      // alert('you clicked on ' + this.title);
      for (var j = 0; j < locationInfos.length; j++) {
        locationInfos[j].close();
      }
      locationInfos[this.index].open(map,this);
    });

  } // end for loop

  console.log('made ' + infoWindows.length + ' infoWindows');
}