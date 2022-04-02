// Store our API endpoint as queryUrl.
//var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2021-01-01&endtime=2021-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data);
});

function createFeatures(earthquakeData) {

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
  }

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  //var earthquakes = L.geoJSON(earthquakeData, {
    //onEachFeature: onEachFeature
  //});


  function set_color(depth){
      console.log (depth);
    
    switch (true) {
        case depth< 5:
         return ("#ffb6c1")
        case depth  >= 6 &&  
         depth <= 10:
         return ("#FF0000")
        case depth >= 11 && depth<=20:
         return ("#800000")
         case depth >= 21:
         return ("#000000")
    }
  
    console.log (features);
    // pink #ffb6c1
  // red #FF0000"
  // maroon #800000
  // black #000000
  }

 var earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function (feature, latlng)
    
    {
        return L.circleMarker(latlng, {
            radius: feature.properties.mag*10,
            fillColor: set_color(feature.geometry.coordinates[2]), //"#ff7800",
            color: "white",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
            //color: "#000",
        }); 
       
      });
       
      
      }
     
    
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Create the base layers.
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object.
  var baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Create an overlay object to hold our overlay.
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);


  
}
