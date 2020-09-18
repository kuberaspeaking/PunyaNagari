let places = [
    "Aundh",
    "Baner",
    "Pashan",
    "Magarpatta",
    "Pu.La, Deshpande garden, Sinhagad Road",
    "Narhe",
    "Hinjewadi",
    "Koregaonpark",
    "Kondhwa", 
    "Kothrud", 
    "Camp",
    "Kalyaninagar",
    "Vimannagar",
    "Empire Estate"
];

var service = platform.getSearchService();
let homeIcon = new H.map.Icon('assets/home.png',{size:{w:25,h:25}});

for(i=0; i<places.length; i++){

    let label =places[i]
    service.geocode({
        q: places[i]+", Pune",
        limit:1
      }, (result) => {
        // Add a marker for each location found
        result.items.forEach((item) => {

            
            let marker = new H.map.Marker(item.position,{icon:homeIcon});
            marker.setData(label);
            placeGroup.addObject(marker);
            let bubble = new H.ui.InfoBubble(item.position, {
                content: label
                });
            // Add info bubble to the UI:
            ui.addBubble(bubble);
        });
      }, alert);
      
}

// add 'tap' event listener, that opens info bubble, to the group
map.addEventListener('tap', function (evt) {
// event target is the marker itself, group is a parent event target
// for all objects that it contains
var bubble =  new H.ui.InfoBubble(evt.target.getGeometry(), {
    // read custom data
    content: evt.target.getData()
});
// show info bubble
ui.addBubble(bubble);

}, false);