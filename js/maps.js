// Step 1: initialize the HERE map platform
// IMPORTANT: Replace the apikey with your own from developer.here.com
var platform = new H.service.Platform({
    apikey: window.here.apikey
  });

var defaultLayers = platform.createDefaultLayers();

var mapCenter = {lat: 18.52036, lng: 73.85557};

// Step 2: Initialize the map in the "map" div
// This map is centered on New York, using the default map style
var map = new H.Map(document.getElementById('map'),
defaultLayers.vector.normal.map, {
center: mapCenter,
zoom: 11,
pixelRatio: window.devicePixelRatio || 1
});
  
// Step 4: Add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());

// Step 5: Enable the event system and add default interactions (e.g., zoom)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Step 6: Create the default UI components (e.g., zoom buttons)
var ui = H.ui.UI.createDefault(map, defaultLayers);
// adjust tilt and rotation of the map

var provider = map.getBaseLayer().getProvider();

// map.getViewModel().setLookAtData({
//     tilt: 60
// });

var style = new H.map.Style('https://kuberaspeaking.github.io/Styles/cesStyle.yaml','https://js.api.here.com/v3/3.1/styles/omv/');

provider.setStyle(style);
var shaniwarwada = new H.map.Icon('assets/shaniwarwada.png',{size:{w:25,h:25}});
var centerMarker = new H.map.Marker(mapCenter,{icon:shaniwarwada});
centerMarker.setData("Shaniwarwada");
var shapeGroup = new H.map.Group();
var placeGroup = new H.map.Group();
map.addObjects([centerMarker,shapeGroup,placeGroup]);
