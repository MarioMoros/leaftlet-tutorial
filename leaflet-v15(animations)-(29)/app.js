//mapa a pantalla completa
$('#map').height(window.innerHeight);


const map = L.map("map", {
  zoomControl: false
}).setView([49.25139533761265, -123.1108509464882], 9);

const tiles = L.tileLayer(
  "https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg",
  {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
).addTo(map);

var marker = L.marker([49.25139533761265, -123.1108509464882]).addTo(map);


//49.25139533761265, -123.1108509464882
map.on('click', function(e){
  var newMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
  L.Routing.control({
    waypoints: [
      L.latLng(49.25139533761265, -123.1108509464882),
      L.latLng(e.latlng.lat, e.latlng.lng)
    ]
  }).on('routesfound', function(e) {
    var routes = e.routes[0];

    routes.coordinates.forEach(function(coord,index){
      setTimeout(function(){
        marker.setLatLng([coord.lat, coord.lng])
      },10*index);
    })
  }).addTo(map);
});



