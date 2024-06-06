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

// add Leaflet-Geoman controls with some options to the map  
map.pm.addControls({  
  position: 'topleft',  
  drawCircleMarker: false,
  rotateMode: false,
}); 

map.on("pm:create", (e) => {
  e.layer.options.pmIgnore = false;
  L.PM.reInitLayer(e.layer);
});



