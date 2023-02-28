var icon = "blue.png";

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
    var lat = locations[0].attributes.latitude;
    var long = locations[0].attributes.longitude;
    console.log(lat);
    console.log(long);
    var marker = new mapboxgl.Marker()
        .setLngLat([long, lat])
        .addTo(map);
    map.flyTo({
            center: [long, lat]
        });
    }
