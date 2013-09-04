jQuery(document).ready(function() {
    console.log("onLoad: jquery ready");
	document.addEventListener("deviceready", onDeviceReady,false);
	
});

// When this function is called, cordova has been initialized and is ready to roll 
function onDeviceReady() {
    console.log("onDeviceReady: cordova ready");

	if(navigator.connection == 'none') {
		//app, you're on your own
		appStart(null);
		return;
	}


	cordova.require("salesforce/plugin/oauth").authenticate(oauth,console.log);
}

function oauth() {
	cordova.require("salesforce/plugin/oauth").getAuthCredentials(
        function(creds) {
            appStart( _.extend(creds, {userAgent: navigator.userAgent}) );
        }, 
        function(error) { 
            console.log("Auth failed: " + error); 
        });
}

function appStart(creds)
{
    // Force init
	console.log(creds);
	
    Force.init(creds, null, null, cordova.require("salesforce/plugin/oauth").forcetkRefresh);

    onApplicationReady(creds);
}


