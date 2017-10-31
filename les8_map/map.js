var sourceURL = "https://datasets.antwerpen.be/v4/gis/speelterreinen.json";
const mapCoordinate = [51.21208495916200, 4.39278641754120];
const mapZoomlevel = 12;

/* global L */


// Load the map as background and center on the target city.
function prepareMap() {
    // Set the map variable
    const myMap = L.map('map');

    // Load the basemap
    const myBasemap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 12,
        attribution: '� <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    // Add basemap to map id
    myBasemap.addTo(myMap);

    // Set view of the map
    myMap.setView(mapCoordinate, mapZoomlevel);

    return myMap;
}


// load the playground data, create markers and the sidebar.
function getMarkers(myMap) {
    const request = new XMLHttpRequest();
    request.open('GET', sourceURL, true);

    request.onload = function () {
        
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);

        const playgrounds = data.data.map(playground => {
            var name = validateString( playground.naam, "Onbekend.");
            
            var street = validateString(playground.straat, "");
            
            var number = validateString(playground.huisnummer, "");
            
            var postalCode = validateString(playground.postcode, "");
            
            var district = validateString(playground.district, "");
            
            var adress = street += " " + number + " " + postalCode + " " + district;

            L.marker([playground.point_lat, playground.point_lng]).bindPopup(`
            <h2>${name}</h2>
            <p><b>Adres:</b> ${adress} </p>
            <p><b>Aantal toestellen:</b> ${playground.toestellen}</p>
            `).openPopup().addTo(myMap);
        });

        // Count each category of playgrounds.
        var categories = [];
        categories[0] = "minder dan 10 toestellen";
        categories[1] = "10 tot 19 toestellen";
        categories[2] = "20 tot 29 toestellen";
        categories[3] = "meer dan 30 toestellen";
        categories[4] = "Onbekend aantal toestellen";

        const categoryCount = data.data.reduce((sums, playground) => {
            var cnt = parseInt(playground.toestellen, 10);

            if (isNaN(cnt))      { sums[4] = (sums[4] || 0) + 1;
            } else if (cnt < 10) { sums[0] = (sums[0] || 0) + 1;
            } else if (cnt < 20) { sums[1] = (sums[1] || 0) + 1;
            } else if (cnt < 30) { sums[2] = (sums[2] || 0) + 1;
            } else               { sums[3] = (sums[3] || 0) + 1;
            }

            return sums;
        }, {});


        // create sidebar
        createSidebar(categories, categoryCount);
    }
    request.send();
}


// creates the actual sidebar.
function createSidebar(categories, categoryCount) {
    const sidebar = document.getElementById('playgrounds');
    const p = document.createElement("p");
    p.innerHTML = `<H3>Speelpleinen volgens aantal toestellen.</H3 >`;
    sidebar.appendChild(p);

    // Print all playgrounds in sidebar with their respective number of playsets.
    for (var i = 0; i < categories.length; i++) {
        const p = document.createElement("p");
        p.innerHTML = `<b>${categories[i]}</b > : ${categoryCount[i]}`;
        sidebar.appendChild(p);
    }
}



// returns either the original string or, if it's null, return the replacement string.
function validateString(inputText, replacementText){
    if (inputText != null){
        return inputText;
    }
    else{
        return replacementText;
    }
}

// Initialize the map and markers.
function initialize() {
    var myMap = prepareMap();
    getMarkers(myMap);
}

window.onload = initialize();