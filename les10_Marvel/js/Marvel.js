var API_GetCharacterURL = "https://gateway.marvel.com:443/v1/public/characters";
var API_ParameterSearch = "nameStartsWith";
var API_ParameterKey = "apikey";
var privateKey = "0e5ad3fccc4b1bc7d38503cb752aabf7";

var searchField;
var StartSearchButton;
var nameListbox;

// "https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=spider&apikey=0e5ad3fccc4b1bc7d38503cb752aabf7"

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

                if (args && (method === 'POST' || method === 'PUT' || method === 'GET')) {
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





function performSearch() {
    console.log("searching");

    var payload = {
        nameStartsWith: searchField.value,
        apikey: "0e5ad3fccc4b1bc7d38503cb752aabf7"
    };

    var callback = {
        success: function (data) {
            
            removeOptions(nameListbox);

            // TODO store ID from data.results.

            var characters = JSON.parse(data).data.results;
            characters.map(function (character) {
                var option = document.createElement("option");
                option.text = character.name;
                nameListbox.add(option);
            });

        },
        error: function (data) {
            
            removeOptions(nameListbox);

            var pre = document.createElement('PRE');
            var t = document.createTextNode('<b>' + 2 + '</b> error ' + data);
            pre.appendChild(t);
            document.body.appendChild(pre);
        }
    };



//    var API_GetCharacterURL = "https://gateway.marvel.com:443/v1/public/characters";
//    var API_ParameterSearch = "nameStartsWith";
 //   var API_ParameterKey = "apikey";
 //   var privateKey = "0e5ad3fccc4b1bc7d38503cb752aabf7";


    // Executes the method call
    
    $http(API_GetCharacterURL)
        .get(payload)
        .then(function (data) {
            callback.success(data);
            return ;
        })
        .catch(callback.error);
    


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

    nameListbox = document.getElementById("nameList");

    // TODO add selection changed event listener to nameListbox, retrieve selected character.
}



function removeOptions(selectbox) {
    var i;
    for (i = selectbox.options.length - 1; i >= 0; i--) {
        selectbox.remove(i);
    }
}