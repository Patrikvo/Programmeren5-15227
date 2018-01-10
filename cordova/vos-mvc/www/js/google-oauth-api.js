var clientId = '566797757019-n7knnllfprnuqr3tmvo654jvddq9qf7t.apps.googleusercontent.com';
var scope = 'profile https://www.googleapis.com/auth/user.birthday.read';
var signinButton;
var signoutButton;


var isLoggedIn = false;
var userFirstName = "";
var userLastName = "";
var userID = -1;


/**
 * Handle the loading of the Google API.
 * This method is called by the apis.google.com/js/api.js
 * when the HTML page is loaded.
 */
function loadAuthClient() {
   // initialiseGUI();

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
 * Handle the initialisation of OAuth2.
 * 
 */
function initAuth() {
    gapi.auth2.init({
        client_id: clientId,
        scope: scope,
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        }).then(handleInitialSignInStatus)
}


/**
 * Handle the initial sign-in state.
 * This method is called by the OAuth initAuth method and is
 * called once the user is signed in succesfully
 */
function handleInitialSignInStatus() {
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
}


var setUserInfo;

/**
 * Handle the actions after signing in or out.
 * 
 */

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {

        var profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
      //  showUserProfile();
      //  makePeopleApiCall();

        isLoggedIn = true;
        userFirstName = profile.getGivenName();
        userLastName = profile.getFamilyName();
        userID = profile.getId();

        setUserInfo(profile.getGivenName(), profile.getFamilyName(), profile.getId());
        
      //  profile.getName()
      //  profile.getImageUrl()
       // profile.getEmail()

    }
    else {
        isLoggedIn = false;
        userFirstName = "Gast";
        userLastName = "Gast";
        userID = -1;


		
    }
}


/**
 * sign-in event handler
 * 
 */
function signIn(event) {
    gapi.auth2.getAuthInstance().signIn();
}


/**
 * sign-out event handler
 * 
 */
function signOut(event) {
    gapi.auth2.getAuthInstance().signOut();
}


/**
 * Prepares the GUI component for use.
 * 
 */
function initialiseGUI() {
    signinButton = document.getElementById('signin-button');
    signoutButton = document.getElementById('signout-button');
    signinButton.style.display = 'block';
    signoutButton.style.display = 'none';

    signinButton.addEventListener("click", signIn);
    signoutButton.addEventListener("click", signOut);
}


/**
 * Calls the Google People API for the logged in user
 * and retrieve the requested field.
 */
function makePeopleApiCall() {
    gapi.client.load('people', 'v1', function () {
        var request = gapi.client.people.people.get({
            resourceName: 'people/me',					// who to request for ('me' is the logged in user.)
            personFields: 'names,birthdays,genders'		// which fields to retrieve. 
        });
        request.execute(function (resp) {
			// show the retrieved field on the page.
            showPeopleAPIProfile(resp);				


            // show the response object as JSON string for debug purposes. This document element is normaly hidden using CSS.
            var pre = document.createElement('pre');
            var feedback = JSON.stringify(resp, null, 4);
            pre.appendChild(document.createTextNode(feedback));
            document.getElementById('raw').appendChild(pre);
        });
    });
}


/**
 * Show the retrieved field of the response object on the page.
 * 
 */
function showPeopleAPIProfile(response) {
    var name = response.names[0].displayName;
    var nameDiv = document.getElementById("name");
    nameDiv.innerHTML = "";
    nameDiv.appendChild(document.createTextNode("Naam: " + name));

    var gender = response.genders[0].formattedValue;
    var genderDiv = document.getElementById("gender");
    genderDiv.innerHTML = "";
    genderDiv.appendChild(document.createTextNode("Geslacht: " + gender));

    var birthday = response.birthdays[0].date.day + "/" + response.birthdays[0].date.month + "/" + response.birthdays[0].date.year;
    var birthdayDiv = document.getElementById("birthday");
    birthdayDiv.innerHTML = "";
    birthdayDiv.appendChild(document.createTextNode("Geboortedatum: " + birthday));
}


/**
 * Show the basic user fields on the page.
 * 'Name' is displayed using the People API call.
 */
function showUserProfile(resp) {

    var profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();

    var userIDDiv = document.getElementById("userID");
    userIDDiv.innerHTML = "";
    userIDDiv.appendChild(document.createTextNode("Gebruikers ID: " + profile.getId()));

    var imageDiv = document.getElementById("image");
    imageDiv.innerHTML = "";
    var img = document.createElement('img');
    img.setAttribute("src", profile.getImageUrl());
    imageDiv.appendChild(img);

    var emailDiv = document.getElementById("email");
    emailDiv.innerHTML = "";
    emailDiv.appendChild(document.createTextNode("Email: " + profile.getEmail()));
}