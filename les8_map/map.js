var sourceURL = "https://datasets.antwerpen.be/v4/gis/speelterreinen.json";

/* global L */

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
myMap.setView([51.21208495916200, 4.39278641754120], 12);



function getMarkers() {
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

        const sidebar = document.getElementById('playgrounds');
        const p = document.createElement("p");
        p.innerHTML = `<H3>Speelpleinen volgens aantal toestellen.</H3 >`;
        sidebar.appendChild(p);

        // Print all playgrounds in sidebar
        for (var i = 0; i < 5; i++){
            const p = document.createElement("p");
            p.innerHTML = `<b>${categories[i]}</b > : ${categoryCount[i]}`;
            sidebar.appendChild(p);
        }


    }

    request.send();



}


function validateString(inputText, replacementText){
    if (inputText != null){
        return inputText;
    }
    else{
        return replacementText;
    }
}



window.onload = getMarkers();
