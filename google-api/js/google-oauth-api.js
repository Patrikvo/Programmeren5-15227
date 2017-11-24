var apiKey = 'AIzaSyCoSQlS5VFZDN6dr7SczR83dFEahbvZQzE';
var clientId = '566797757019-n7knnllfprnuqr3tmvo654jvddq9qf7t.apps.googleusercontent.com';
var scope = 'profile';
var signinButton;
var signoutButton;

function loadAuthClient() {
    initialiseGUI();

    // Load the API client and auth library

    gapi.load('client:auth2', {
        callback: function () {
            // Handle gapi.client initialization.
            initAuth();
        },
        onerror: function () {
            // Handle loading error.
            alert('gapi.client failed to load!');
        },
        timeout: 5000, // 5 seconds.
        ontimeout: function () {
            // Handle timeout.
            alert('gapi.client could not load in a timely manner!');
        }
    });
}

/**
 * Handle the initial sign-in state.
 * This method is called by the OAuth initAuth method and is
 * called once the user is signed in succesfully
 */
function handleInitialSignInStatus() {
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
}




function initAuth() {

    gapi.auth2.init({
        client_id: clientId,
        scope: scope,
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        }).then(handleInitialSignInStatus)
        .then(makePeopleApiCall)
        .then(showUserProfile);
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        signinButton.style.display = 'none';
        signoutButton.style.display = 'block';
    }
    else {
        signinButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}

function signIn(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function signOut(event) {
    gapi.auth2.getAuthInstance().signOut();
}


function initialiseGUI() {
    signinButton = document.getElementById('signin-button');
    signoutButton = document.getElementById('signout-button');
    signinButton.style.display = 'none';
    signoutButton.style.display = 'none';

    signinButton.addEventListener("click", signIn);
    signoutButton.addEventListener("click", signOut);
}




// https://developers.google.com/people/api/rest/v1/people/get
function makePeopleApiCall() {
    gapi.client.load('people', 'v1', function () {
        var request = gapi.client.people.people.get({
            resourceName: 'people/me',
            personFields: 'names'
        });
        request.execute(function (resp) {
            var p = document.createElement('p');
            if (resp.names) {
                var name = resp.names[0].givenName;
            }
            else {
                var name = 'Geen naam gevonden';
            }
            p.appendChild(document.createTextNode('Hello, ' + name + '!'));
            document.getElementById('content').appendChild(p);


            // Toon het response object als JSON string
            var pre = document.createElement('pre');
            var feedback = JSON.stringify(resp, null, 4);
            pre.appendChild(document.createTextNode(feedback));
            document.getElementById('raw').appendChild(pre);
        });
    });
}
function showUserProfile(resp) {
    // Note: In this example, we use the People API to get the current
    // user's name. In a real app, you would likely get basic profile info
    // from the GoogleUser object to avoid the extra network round trip.
    var profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
    var h1 = document.createElement('h1');
    h1.appendChild(document.createTextNode(profile.getId()));
    document.getElementById('content').appendChild(h1);
    var h2 = document.createElement('h2');
    h2.appendChild(document.createTextNode(profile.getName()));
    document.getElementById('content').appendChild(h2);
    var h3 = document.createElement('h3');
    h3.appendChild(document.createTextNode(profile.getGivenName()));
    document.getElementById('content').appendChild(h3);
    var h4 = document.createElement('h4');
    h4.appendChild(document.createTextNode(profile.getFamilyName()));
    document.getElementById('content').appendChild(h4);
    var img = document.createElement('img');
    img.setAttribute("src", profile.getImageUrl());
    document.getElementById('content').appendChild(img);
    var h5 = document.createElement('h5');
    h5.appendChild(document.createTextNode(profile.getEmail()));
    document.getElementById('content').appendChild(h5);
}