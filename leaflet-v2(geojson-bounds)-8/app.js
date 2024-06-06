const map = L.map("map").setView([49.25139533761265, -123.1108509464882], 9);

const tiles = L.tileLayer(
  "https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg",
  {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
).addTo(map);

var geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [-123.02992377849606, 49.23136795562928],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [
          [-123.05547023593043, 49.1858520790565],
          [-122.96885045570728, 49.21280359458626],
          [-122.96582298860038, 49.1346785747281],
          [-122.88194959033846, 49.20722086393661],
        ],
        type: "LineString",
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [
          [
            [-123.28302532508447, 49.22951637835945],
            [-123.28587018908871, 49.15607944088663],
            [-123.18914481294107, 49.16073058007217],
            [-123.20049799299038, 49.23322608558709],
            [-123.28302532508447, 49.22951637835945],
          ],
        ],
        type: "Polygon",
      },
    },
  ],
};

//var popup = L.popup();

var icon = L.icon({
    iconUrl: 'marker.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -28]
});

L.geoJSON(geojson,{
    style: function(feature){
        return{
            color: '#000',
            weight: 0.5
        }
    },
    pointToLayer: function(geoJsonPoint, latlng){
        return L.marker(latlng, {
                icon: icon
            })
    },
    onEachFeature: function(feature, layer){
        if(feature.geometry.type === 'Point'){
            layer.bindPopup(feature.geometry.coordinates.join(','));
        }
    }
}).addTo(map);
