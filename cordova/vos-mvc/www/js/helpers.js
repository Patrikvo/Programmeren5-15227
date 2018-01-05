/**
 * Created by jefin on 20/05/2017.
 */
/**
 * Geolocatie van de telefoon ophalen
 *
 */
/**
 * Een html element creëren van het type opgegeven in de tag parameter.
 * Plaats de tekst opgegeven in de text parameter in het gemaakte element.
 *
 * @param {string} text Text to be placed in the html element.
 * @param {string} tag type van het te maken html element.
 */
var makeTextElement = function(text, tag) {
    if (!tag) {
        tag = 'P';
    }
    var elem = document.createElement(tag);
    var textNode = document.createTextNode(text);
    elem.appendChild(textNode);
    return elem;
}

/**
 * Een html element creëren van het type opgegeven in de tag parameter.
 * Plaats de tekst met html opmaak opgegeven in de text parameter in het gemaakte element.
 *
 * @param {string} text Text to be placed in the html element.
 * @param {string} tag type van het te maken html element.
 */
var makeHtmlTextElement = function(text, tag) {
    if (!tag) {
        tag = 'P';
    }
    var elem = document.createElement(tag);
    elem.innerHTML = text;
    return elem;
}
/**
 * Een button html element maken met een specifieke tekst erin met een bepaalde opgegeven klassennaam.
 *
 * @param {string} text Text to be placed in the button element.
 * @param {string} className klassenaam van de button.
 */
var makeButton = function(text, className) {
    var buttonElem = document.createElement('BUTTON');
    buttonElem.setAttribute('type', 'submit');
    if (className !== undefined) {
        buttonElem.setAttribute('class', className);
    }
    var textElem = document.createTextNode(text);
    buttonElem.appendChild(textElem);
    return buttonElem;
}

/**
 * Een button html element maken met een specifieke tekst erin en een bepaald icoon.
 *
 * @param {string} text Text to be placed in the button element.
 * @param {string} icon klassenaam van het te tonen icoon.
 */
var makeTileButton = function(text, icon) {
    var buttonElem = document.createElement('BUTTON');
    buttonElem.setAttribute('type', 'submit');
    buttonElem.setAttribute('class', 'tile');
    var iconElem = document.createElement('SPAN');
    iconElem.setAttribute('class', icon);
    buttonElem.appendChild(iconElem);
    var screenReaderTextElem = document.createElement('SPAN');
    screenReaderTextElem.setAttribute('class', 'screen-reader-text');
    var textElem = document.createTextNode(text);
    screenReaderTextElem.appendChild(textElem);
    buttonElem.appendChild(screenReaderTextElem);
    return buttonElem;
}

/**
 * Een commandPanel element maken.
 *
 */
var makeCommandPanel = function() {
    var elem = document.createElement('DIV');
    elem.setAttribute('class', 'command-panel');
    return elem;
}

/**
 * Juiste telefoonnummer ophalen.
 *
 */
var getPhoneNumber = function(number) {
    var phoneNumber = number;
    switch (number) {
        case 'DV' :
            phoneNumber = vos.model.myLocation.directie.phone;
            break;
        case 'secretariaat' :
            phoneNumber = vos.model.myLocation.secretariaat.phone;
            break;
        case 'preventieadviseur' :
            phoneNumber = vos.model.myLocation.preventieadviseur.phone;
            break;
    }
    return phoneNumber;
}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    // alert('lat1' + lat1 + ' lat2: ' + lat2 + ' d: '+  d);
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI/180)
}