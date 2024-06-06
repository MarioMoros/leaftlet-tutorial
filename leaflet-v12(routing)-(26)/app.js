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

setInterval(function(){
  if ("geolocation" in navigator) {
    /* geolocation is available */
    navigator.geolocation.getCurrentPosition((position) => {
      L.circle([position.coords.latitude, position.coords.longitude], {
        radius: 1000,
        opacity: 1,
        color: 'white',
        weight: 1,
        fillOpacity: 1,
        fillColor: 'blue'
      }).addTo(map);
    });
  } else {
    /* geolocation IS NOT available */
    console.log("no geolocation");
  }
},1000)





