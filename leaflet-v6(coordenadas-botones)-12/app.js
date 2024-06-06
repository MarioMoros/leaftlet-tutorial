const map = L.map("map").setView([49.25139533761265, -123.1108509464882], 9);

const tiles = L.tileLayer(
  "https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg",
  {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
).addTo(map);

//var popup = L.popup();

var icon = L.icon({
  iconUrl: 'marker.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -28]
});

var iconColored = L.icon({
  iconUrl: 'marker-colored.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -28]
});

var markers = [];
var coordinates = [
  [49.25139533761265, -123.1108509464882],
  [49.25139533761265, -123.2208509464882],
  [49.35139533761265, -123.1108509464882],
  [49.35139533761265, -123.2208509464882]
];

coordinates.forEach(function(coords){
  var marker = L.marker(coords, {
    icon: icon
  }).on('mouseove', function(e){
    e.target.setIcon(iconColored);
  }).on('mouseout', function(e){
    e.target.setIcon(icon);
  });
  markers.push(marker);
})

var featureGroup = L.featureGroup(markers).bindPopup('hola').addTo(map);

map.fitBounds(featureGroup.getBounds(), {
  padding: [20,20]
});

var options = {units: 'kilometers'};
map.on('mousemove', function(e){
  console.log(e);
  var from = turf.point([e.latlng.lat, e.latlng.lng]);
  markers.forEach(function(marker){
    var to = turf.point([marker.getLatLng().lat, marker.getLatLng().lng]);
    var distance = turf.distance(from, to, options);
    if(distance<3){
      marker.setIcon(iconColored);
    }else{
      marker.setIcon(icon);
    }
  });
});

//obtener las coordenadas
map.on('moveend', function(e){
  $('#current_center').val(map.getCenter().lat+','+map.getCenter().lng);
});

//esconder y mostrar los layers
$(document).on('click','#toggleLayer', function(){
  if(map.hasLayer(featureGroup)){
    map.removeLayer(featureGroup);
  }else{
    featureGroup.addTo(map);
  }
});
