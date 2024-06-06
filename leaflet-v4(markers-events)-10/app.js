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
  });
  markers.push(marker);
})

var featureGroup = L.featureGroup(markers)
  .on('mousemove', function(e){
    e.layer.setIcon(iconColored);
  })
  .on('mouseout', function(e){
    e.layer.setIcon(icon);
  })
  .bindPopup('hola').addTo(map);

map.fitBounds(featureGroup.getBounds(), {
  padding: [20,20]
})
