var sourceURL = "http://datasets.antwerpen.be/v4/gis/speelterreinen.json";

// Set the map variable
const myMap = L.map('map');

// Load the basemap
const myBasemap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 12,
  attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

// Add basemap to map id
myBasemap.addTo(myMap);

// Set view of the map
myMap.setView([51.21208495916200, 4.39278641754120], 12);



function getMarkers() {
    const request = new XMLHttpRequest();
    request.open('GET', sourceURL, true);

    request.onload = function () {
        
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);

        const playgrounds = data.data.map(playground => {
            L.marker([playground.point_lat, playground.point_lng]).bindPopup(`
            <h2>${playground.naam}</h2>
            <p><b>Adres:</b> ${playground.straat} ${playground.huisnummer} ${playground.postcode}  ${playground.district} </p>
            <p><b>Aantal toestellen:</b> ${playground.toestellen}</p>
            `).openPopup().addTo(myMap);
        });


    }

    request.send();



}





window.onload = getMarkers();
