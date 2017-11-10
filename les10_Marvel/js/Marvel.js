var API_GetCharacterURL = "https://gateway.marvel.com:443/v1/public/characters";
var API_ParameterSearch = "nameStartsWith";
var API_ParameterKey = "apikey";
var privateKey = "0e5ad3fccc4b1bc7d38503cb752aabf7";

var searchField;
var StartSearchButton;



// get comics from character ID
// https://gateway.marvel.com:443/v1/public/characters/1009610/comics?format=comic&formatType=comic&limit=20&apikey=0e5ad3fccc4b1bc7d38503cb752aabf7



// A-> $http function is implemented in order to follow the standard Adapter pattern
function $http(url) {

    // A small example of object
    var core = {

        // Method that performs the ajax request
        ajax: function (method, url, args) {

            // Creating a promise
            var promise = new Promise(function (resolve, reject) {

                // Instantiates the XMLHttpRequest
                var client = new XMLHttpRequest();
                var uri = url;

                if (args && (method === 'POST' || method === 'PUT')) {
                    uri += '?';
                    var argcount = 0;
                    for (var key in args) {
                        if (args.hasOwnProperty(key)) {
                            if (argcount++) {
                                uri += '&';
                            }
                            uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
                        }
                    }
                }

                client.open(method, uri);
                client.send();

                client.onload = function () {
                    if (this.status == 200) {
                        // Performs the function "resolve" when this.status is equal to 200
                        resolve(this.response);
                    }
                    else {
                        // Performs the function "reject" when this.status is different than 200
                        // je toont alleen de this.responseText in de ontwikkelingsfase
                        // niet in de productiefase
                        reject(this.statusText + this.responseText);
                    }
                };
                client.onerror = function () {
                    reject(this.statusText);
                };
            });

            // Return the promise
            return promise;
        }
    };

    // Adapter pattern
    return {
        'get': function (args) {
            return core.ajax('GET', url, args);
        },
        'post': function (args) {
            return core.ajax('POST', url, args);
        },
        'put': function (args) {
            return core.ajax('PUT', url, args);
        },
        'delete': function (args) {
            return core.ajax('DELETE', url, args);
        }
    };
};
// End A

// B-> Here you define its functions and its payload
var payload = {
    'topic': 'js',
    'q': 'Promise'
};

var callback = {
    success: function (data) {
        var pre = document.createElement('PRE');
        var t = document.createTextNode(data);
        pre.appendChild(t);
        document.body.appendChild(pre);
    },
    error: function (data) {
        var pre = document.createElement('PRE');
        var t = document.createTextNode('<b>' + 2 + '</b> error ' + data);
        pre.appendChild(t);
        document.body.appendChild(pre);
    }
};
// End B



function performSearch() {
    console.log("searching");

    // Executes the method call
    /*
    $http('data/procedureList.json')
        .get(payload)
        .then(function (data) {
            callback.success(data);
            return $http('data/organisationList.json').get(payload);
        })
        .catch(callback.error)
        .then(function (data) {
            callback.success(data);
        })
        .catch(callback.error);
    */


}

function searchTextChanged() {
    if (searchField.value != null && searchField.value.length > 0) {
        StartSearchButton.disabled = false;
    }
    else {
        StartSearchButton.disabled = true;
    }
}


window.onload = function () {
    

    searchField = document.getElementById("searchField");
    StartSearchButton = document.getElementById("buttonStartSearch");
    StartSearchButton.disabled = true;

    searchField.addEventListener("input", searchTextChanged, false);

    StartSearchButton.addEventListener("click", performSearch, false);

    
}