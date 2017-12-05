"use strict"

// event listeners below - not related to bugsnag notifer.
document.addEventListener ("DOMContentLoaded", function() 
    {
        // JS error event listeners
        $('#jsRangeError').on('click', fJsRange);
        $('#jsRefError').on('click', fJsRef);
        $('#jsTypeError').on('click', fJsType);


    } 
); 

console.log("app.js loaded;");

// ********************************************
// BUGSNAG v4 JAVASCRIPT NOTIFIER - CONFIGURATION
// ********************************************

// N.B. In this example, the bugsnagClient has already been initialized in th HTML.
// The code below cahnges and adds to the client. Please see docs for the various
// ways to install, initialize and configure bugsnag in your app. https://docs.bugsnag.com/platforms/browsers/js/



// beforeSend is a powerfool tool.  It will fire right before EVERY error is sent, 
// whether handled or unhandled.  Here you can remove private data, 
// add custom datapoints, and even stop the report entirely.

// if you are used to v3, this is VERY different syntax.  beforeSend is an ARRAY,
// so you can have mutliple beforeSend's. N.B. syntax is simpler if you define 
// beforeSend where you initialize your bugsnagClient, but that did not work for 
// this example.
bugsnagClient.config.beforeSend.push(function (report) {
        console.log("snag(bug);");
        var user_info = fGetUserData();
        var rstage = user_info["rstage"];
        report.app.releaseStage = rstage;
        report.user["name"] = user_info["user"];
      }
    );


// Metadata allows you to add any custom info that is relevant to your app.
// very usefgul for trackign A/B testing.  
// This code will attache to ALL error reports within this app, but
// you could also define metadata inside the beforeSend (if for example, 
// the data changes throughout the user's interaction with your app.)
bugsnagClient.metaData = {
  company: {
      name: "Themyscira",
      transport: "invisible jet"
    }
  }

// below syntax is like a 'log' to bugsnag.  
// It does not even require an error object, just a string name & message.
// Additional data is optional.
//This code automatically send an error report every time the page is loaded
bugsnagClient.notify({
  name: "SeverityTest", 
  message: "Monkey pants!!!!!!1!!!!" 
},
  {severity: "info"
});


// *************************************
// FUNCTIONS TO TRIGGER JAVASCRIPT ERRORS
// *************************************
// each of these funcitons shows what happens when the error is handled or 
// unhandled. 

// handles the button for JavaScript Index error.
function fJsRange(evt) {
    var user_info = fGetUserData();
    var num = 1;

    if (user_info["handling"] === "yes") {
        try {
            num.toPrecision(500);
        } 
        catch (e) {
            bugsnagClient.notify(e, {
                context: "a handled Range Error - ta da!!"
            });            
        }
    }

    else {
        // deliberate Range Error
        num.toPrecision(500);
    }

}

// handles the button for JavaScript Name error.
function fJsRef(evt) {
    var user_info = fGetUserData();
    if (user_info["handling"] === "yes") {
        try {
            console.log(doesntExist);
        } 
        catch (e) {
            bugsnagClient.notify(e, { 
               context: "a handled Reference Error - HUZZAH!"
            });            
        }
    }

    else {
        // deliberate Reference Error
        console.log(doesntExist);
    }
}

// handles the button for JavaScript Type error.
function fJsType(evt) {
    var user_info = fGetUserData();
    var num = 1;

    if (user_info["handling"] === "yes") {

        try {
            num.toUpperCase(); 
        }
        catch (e) {
            bugsnagClient.notify(e, { 
               context: "a handled Tyoe Error - BOOYAH!"
            });            
        }
    }
    else {
        // deliberate Type Error
        num.toUpperCase(); 
    }
}


// captures the data user has been selected on the page,
// to hand over to AJAX calls. A "mock" of user/session 
// info you can add to any error.

function fGetUserData() {
    var user = $('#username').val();
    var rstage = $('#rstage option:selected').val();
    var handling = $('#handling input:checked').val();
    // if user field is blank:
    if (user.trim() === "") {
        user = "Voltron, Defender of the Universe"
    }

    var user_info = {
        "user": user,
        "rstage": rstage,
        "handling": handling
    };

    console.log(user_info);
    return user_info;
}





