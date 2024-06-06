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
var filters = {
  text: '',
  range: []
}
var earthquakesPointsArray = [];


//llamada al json de countries
fetch('/countries.json',{
  method: 'GET'
})
.then(response => response.json())
.then(json => {
  //Bucle para obtener la lista de paises
  json.features.forEach(function(feature){
    $('#country-select').append('<option value="'+feature.properties.name+'">'+feature.properties.name+'</option>');
  });


  countriesGeoJSON = L.geoJSON(json, {
    style: function(feature){
      return{
        fillOpacity: 0,
        weight: 0.5
      };
    },
    onEachFeature: function(feature,layer){
      layer.on('mouseover', function(){
        layer.setStyle({
          fillOpacity: 0.3
        });
        $('#country-select').val('');

        var points = turf.points(earthquakesPointsArray);
        var totalPoints = 0;
        if(layer.feature.geometry.coordinates[0].length === 1){
          layer.feature.geometry.coordinates.forEach(function(coords){
            var searchWithin = turf.polygon(coords);
            var ptsWithin = turf.pointsWithinPolygon(points, searchWithin);
            totalPoints += ptsWithin.features.length;
          });
        }else{
          var searchWithin = turf.polygon(layer.feature.geometry.coordinates);
          var ptsWithin = turf.pointsWithinPolygon(points, searchWithin);
          totalPoints += ptsWithin.features.length;
        }
        

        $('#country-information').html(layer.feature.properties.name + '('+layer.feature.id+') '+totalPoints);
      });
      layer.on('mouseout', function(){
        layer.setStyle({
          fillOpacity: 0
        });
        $('#country-information').html('');
      });
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

  json.features.forEach(function(feature){
    earthquakesPointsArray.push(feature.geometry.coordinates);
  });

  
  var min = 0;
  var max = 0;

  //contenido heatmap de earthquakes
  var heatMapPoints = [];
  json.features.forEach(function(feature){
    heatMapPoints.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0], (feature.properties.mag/5)])
    if(feature.properties.mag < min || min === 0){
      min = feature.properties.mag;
    }else if(feature.properties.mag > max){
      max = feature.properties.mag;
    }
  });

  var heat = L.heatLayer(heatMapPoints, {
    radius: 25,
    minOpacity: 0.4,
    gradient: {
      '0': 'Navy', '0.25': 'Navy',
      '0.26': 'Green',
      '0.5': 'Green',
      '0.51': 'Yellow',
      '0.75': 'Yellow',
      '0.76': 'Red',
      '1': 'Red'
    }
  }).addTo(map);
  
  
  /* earthquakesGeoJSON = L.geoJSON(json, {
    style: function(feature){
      return{
        fillOpacity: 0.1,
        fillColor: '#000',
        color: '#000',
        opacity: 0.3
      };
    },
    pointToLayer: function(geoJSONPoint, latlng){
      //Obtener min/max magnitud
      if(geoJSONPoint.properties.mag < min || min === 0){
        min = geoJSONPoint.properties.mag;
      }else if(geoJSONPoint.properties.mag > max){
        max = geoJSONPoint.properties.mag;
      }

      //Popup
      var html = '';
      var arrayOfProps = ['title', 'mag', 'place', 'time'];
      arrayOfProps.forEach(function(prop){
        html += '<strong>'+prop+'</strong>: '+geoJSONPoint.properties[prop]+'<br/>';
      })
      return L.circle(latlng, 50000*(geoJSONPoint.properties.mag)).bindPopup(html);
    }
  }).addTo(map); */

  //Slider range
  filters.range = [min,max];
  var slider = document.getElementById('slider');
  noUiSlider.create(slider, {
      start: filters.range,
      tooltips: true,
      connect: true,
      range: {
          'min': min,
          'max': max
      }
  }).on('slide', function(e){
    filters.range = [parseFloat(e[0]),parseFloat(e[1])];
    earthquakesGeoJSON.eachLayer(function(layer){
      filterGeoJSON(layer);
    });
  });
  //map.fitBounds(earthquakesGeoJSON.getBounds());
})
.catch(error => console.log(error.message));

$(document).on('keyup', '#search', function(e){
  filters.text = e.target.value;
  earthquakesGeoJSON.eachLayer(function(layer){
    filterGeoJSON(layer);
  });
});

$(document).on('change', '#country-select', function(e){
  var newCountry = e.target.value;
  if(newCountry !== ''){
    countriesGeoJSON.eachLayer(function(layer){
      if(layer.feature.properties.name === e.target.value){
        var points = turf.points(earthquakesPointsArray);
        var totalPoints = 0;
        if(layer.feature.geometry.coordinates[0].length === 1){
          layer.feature.geometry.coordinates.forEach(function(coords){
            var searchWithin = turf.polygon(coords);
            var ptsWithin = turf.pointsWithinPolygon(points, searchWithin);
            totalPoints += ptsWithin.features.length;
          });
        }else{
          var searchWithin = turf.polygon(layer.feature.geometry.coordinates);
          var ptsWithin = turf.pointsWithinPolygon(points, searchWithin);
          totalPoints += ptsWithin.features.length;
        }
        

        $('#country-information').html(layer.feature.properties.name + '('+layer.feature.id+') '+totalPoints);
        map.fitBounds(layer.getBounds());
      }
    });
  }else{
    $('#country-information').html('');
  }
});

function filterGeoJSON(layer){
  var numberOfTrue = 0;
  if(layer.feature.properties.title.toLowerCase().indexOf(filters.text.toLowerCase()) > -1){
    numberOfTrue += 1;
  }

  if(layer.feature.properties.mag >= filters.range[0] && 
    layer.feature.properties.mag <= filters.range[1]){
      numberOfTrue += 1;
  }

  if(numberOfTrue === 2){
    layer.addTo(map);
  }else{
    map.removeLayer(layer);
  }
}


//obtener las coordenadas
map.on('moveend', function(e){
  $('#current_center').html(map.getCenter().lat+','+map.getCenter().lng);
});

//mostrar slide
$(document).on('click', '#advanced', function(){
  if($('#slide-in').hasClass('in')){
    $('#slide-in').removeClass('in');
  }else{
    $('#slide-in').addClass('in');
  }
});


