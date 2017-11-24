var apiKey = 'AIzaSyCoSQlS5VFZDN6dr7SczR83dFEahbvZQzE';
var clientId = '566797757019-n7knnllfprnuqr3tmvo654jvddq9qf7t.apps.googleusercontent.com';
var scope = 'profile';
var signinButton;
var signoutButton;

		function loadAuthClient() {
    // Load the API client and auth library
    gapi.load('client:auth2', initAuth);
}

        /**
         * Handle the initial sign-in state.
         * This method is called by the OAuth initAuth method and is
         * called once the user is signed in succesfully
         */
        var handleInitialSignInStatus = function() {
			signinButton = document.getElementById('signin-button');
			signoutButton = document.getElementById('signout-button');
			
            updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
            signinButton.addEventListener("click", signIn);
            signoutButton.addEventListener("click", signOut);
        }

		


function initAuth() {
    // gapi.client.setApiKey(apiKey);
    gapi.auth2.init({
            client_id: clientId,
            scope: scope,
            immediate: true
        }).then(function() {
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        }).then(handleInitialSignInStatus);
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