var prox = mapCenter.lat + ',' + mapCenter.lng;
let revgeocode = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json`;
let params ={
    prox:prox,
    mode: 'retrieveAddresses',
    maxresults: '1',            
    additionaldata: 'IncludeShapeLevel,city'
};

fetch(revgeocode+`?apikey=${window.here.apikey}&prox=${params.prox}&mode=${params.mode}&maxresults=${params.maxresults}&additionaldata=${params.additionaldata}`)
.then(response => response.json())
.then(response=>{
    // console.log(response);
    drawArea(response);
})
.catch(error=>{
    console.log(error);
})

var customStyle = {
    strokeColor: 'black', //TODO: change color
    fillColor: 'rgba(86,66,125,0.5)', //TODO: change color
    lineWidth: 2,            
    lineJoin: 'bevel'
};

function drawArea(response){
    let location = response.Response.View[0].Result[0].Location;
    if(typeof location.Shape != "undefined"){
        let shape = location.Shape.Value;
        let geometry = H.util.wkt.toGeometry(shape); 
        // geometry is either a single or multi-polygon     
        if (geometry instanceof H.geo.MultiGeometry) {
            var geometryArray = geometry.getGeometries(); 
            for (var i = 0; i < geometryArray.length; i++) {
                shapeGroup.addObject(new H.map.Polygon(geometryArray[i].getExterior(), { style: customStyle }));            
            }
        } else { // instanceof H.geo.Polygon    
            shapeGroup.addObject(new H.map.Polygon(geometry.getExterior(), { style: customStyle }));            
        }     
    }
    else{
        alert("No Shape Found");
    }
    
}



