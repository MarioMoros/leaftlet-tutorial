const map = L.map("map").setView([49.25139533761265,-123.1108509464882], 9);

const tiles = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',

}).addTo(map);

var shapeStyle = {
    color: "red",
    fillColor: "dark",
    fillOpacity: 0.5,
    radius: 2000,
  }
const icon = L.icon({
    iconUrl: 'marker.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],//el primer valor es la mitad del size
    popupAnchor: [0, -30]//segundo valor algo menos que el size
});

var popup = L.popup({
    maxWidth: 200
})
    .setLatLng([49.35139533761265,-123.2108509464882])
    .setContent('<img style="width: 100px" src="españita.jpg"/>');

const marker = L.marker([49.35139533761265,-123.2108509464882], {icon:icon}).addTo(map).bindPopup(popup);





const circle = L.circle([49.25139533761265,-123.1108509464882], 2000, shapeStyle).addTo(map).bindPopup("im a circle");

const polygon = L.polygon([
    [49.239443282228365,-123.19375215955661],
    [49.2073178488956,-123.15304692824967],
    [49.22384286643768,-123.06021259490291],
    [49.239443282228365,-123.19375215955661]
],shapeStyle).addTo(map).bindPopup("im a polygon");
