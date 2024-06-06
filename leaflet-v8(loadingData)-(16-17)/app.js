//mapa a pantalla completa
$('#map').height(window.innerHeight);
$('#slide-in').height(window.innerHeight);


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

//loading data
var earthquakesGeoJSON = false;
var countriesGeoJSON = false;


//llamada al json de countries
fetch('/countries.json',{
  method: 'GET'
})
.then(response => response.json())
.then(json => {
  countriesGeoJSON = L.geoJSON(json, {
    style: function(feature){
      return{
        fillOpacity: 0
      };
    }
  }).addTo(map);
  if(earthquakesGeoJSON){
    earthquakesGeoJSON.bringToFront();
  }
  map.fitBounds(countriesGeoJSON.getBounds());
})
.catch(error => console.log(error.message));


//llamada al geojson de earthquakes
fetch('/earthquakes_day.geojson',{
  method: 'GET'
})
.then(response => response.json())
.then(json => {
  earthquakesGeoJSON = L.geoJSON(json, {
    style: function(feature){
      return{
        fillOpacity: 0.3,
        fillColor: '#000',
        color: '#000',
        opacity: 0.3
      };
    },
    pointToLayer: function(geoJSONPoint, latlng){
      return L.circle(latlng, 50000*(geoJSONPoint.properties.mag));
    }
  }).addTo(map);
  earthquakesGeoJSON.bringToFront();
  map.fitBounds(earthquakesGeoJSON.getBounds());
})
.catch(error => console.log(error.message));



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

//mostrar slide
$(document).on('click', '#advanced', function(){
  if($('#slide-in').hasClass('in')){
    $('#slide-in').removeClass('in');
  }else{
    $('#slide-in').addClass('in');
  }
});
