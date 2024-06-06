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
  iconUrl: 'marker.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -28]
});


var marker1 = L.marker([49.25139533761265, -123.1108509464882],{
  icon: icon
})
var marker2 = L.marker([49.25139533761265, -123.2208509464882],{
  icon: icon
})
var marker3 = L.marker([49.35139533761265, -123.1108509464882],{
  icon: icon
})
var marker4 = L.marker([49.35139533761265, -123.2208509464882],{
  icon: icon
})


var featureGroup = L.featureGroup([marker1, marker2, marker3, marker4]).addTo(map);

map.fitBounds(featureGroup.getBounds(), {
  padding: [20,20]
})
