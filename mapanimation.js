var colArray = [
    "#C41E3A",
    "#CC5500",
    "#FFDB58",
    "#228B22",
    "#000080",
    "7F00FF",
    "#964B00",
    "#87CEEB"
];
var busToggle = 0;
var markers = [];

//your token goes below in place of mine
mapboxgl.accessToken = 'pk.eyJ1IjoidGhvbWFzbWtuaWdodCIsImEiOiJjbGVuOW5ya28xY3NnM3RyMDQ2ZnNkYWozIn0.ecaejiZKLI8krjs8N6yIxA';

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-71.104081, 42.365554],
  zoom: 14
});


async function addMarkers(){
    var url = "https://api-v3.mbta.com/vehicles?api_key=ca34f7b7ac8a445287cab52fb451030a&filter[route]=1&include=trip";
    var response = await fetch(url);
    var json = await response.json();
    var locations = await json.data;
    console.log(locations);
    var lat = locations[busToggle].attributes.latitude;
    var long = locations[busToggle].attributes.longitude;
    console.log(lat);
    console.log(long);
    var marker = new mapboxgl.Marker({
        color: colArray[busToggle],
        draggable: false
    }).setLngLat([long, lat])
        .addTo(map);
    map.flyTo({
            center: [long, lat]
        });
    markers.push(marker);
    }

async function toggleBus() {
    var url = "https://api-v3.mbta.com/vehicles?api_key=ca34f7b7ac8a445287cab52fb451030a&filter[route]=1&include=trip";
    var response = await fetch(url);
    var json = await response.json();
    var locations = await json.data;
    if(busToggle < locations.length){
    busToggle +=1;
    } else{
        busToggle = 0;
    }
    addMarkers();

}

