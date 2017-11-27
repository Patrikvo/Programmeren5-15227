var apiKey = 'AIzaSyCoSQlS5VFZDN6dr7SczR83dFEahbvZQzE';
var clientId = '566797757019-n7knnllfprnuqr3tmvo654jvddq9qf7t.apps.googleusercontent.com';
var scope = 'profile https://www.googleapis.com/auth/user.birthday.read';
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
}



function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        signinButton.style.display = 'none';
        signoutButton.style.display = 'block';

        showUserProfile();
        makePeopleApiCall();
        
    }
    else {
        signinButton.style.display = 'block';
        signoutButton.style.display = 'none';

        

        document.getElementById("name").innerHTML = "";
        document.getElementById("gender").innerHTML = "";
        document.getElementById("birthday").innerHTML = "";
        document.getElementById("userID").innerHTML = "";
        document.getElementById("email").innerHTML = "";
        document.getElementById("image").innerHTML = "";


        document.getElementById('raw').innerHTML = "";
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
    signinButton.style.display = 'block';
    signoutButton.style.display = 'none';

    signinButton.addEventListener("click", signIn);
    signoutButton.addEventListener("click", signOut);
}





function makePeopleApiCall() {
    gapi.client.load('people', 'v1', function () {
        var request = gapi.client.people.people.get({
            resourceName: 'people/me',
            personFields: 'names,birthdays,genders'
        });
        request.execute(function (resp) {
            showPeopleAPIProfile(resp);



            // Toon het response object als JSON string
            var pre = document.createElement('pre');
            var feedback = JSON.stringify(resp, null, 4);
            pre.appendChild(document.createTextNode(feedback));
            document.getElementById('raw').appendChild(pre);

        });
    });
}

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






function showUserProfile(resp) {
    // Note: In this example, we use the People API to get the current
    // user's name. In a real app, you would likely get basic profile info
    // from the GoogleUser object to avoid the extra network round trip.
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