/**
 * Assuming that "map" and "platform" are already initialized
 */
 // Create default map layers:
 var service = platform.getPlatformDataService();
 var customStyle = {
    strokeColor: 'black', //TODO: change color
    fillColor: 'rgba(86,66,125,0.5)', //TODO: change color
    lineWidth: 2,            
    lineJoin: 'bevel'
};

 style = new H.map.SpatialStyle();
 // create tile provider and layer that displays postcode boundaries
 var boundariesProvider = new H.service.extension.platformData.TileProvider(service,
 {
   layer: 'ADMIN_POLY_8', level: 10
 }, {
   resultType: H.service.extension.platformData.TileProvider.ResultType.POLYLINE,
   styleCallback: function(data) {return customStyle}
 });
 var boundaries = new H.map.layer.TileLayer(boundariesProvider);
 map.addLayer(boundaries);
 