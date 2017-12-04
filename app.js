"use strict"


document.addEventListener ("DOMContentLoaded", function() 
    {
        // JS error event listeners
        $('#jsRangeError').on('click', fJsRange);
        $('#jsRefError').on('click', fJsRef);
        $('#jsTypeError').on('click', fJsType);


    } 
); 

console.log("app.js loaded;");

// beforeSend is a powerfool tool.  It will fire before EVERY error is sent, 
// whether handled or unhandled.  Here you can remove private data, 
// add custom datapoints, and even stop the report entirely.

// if you are used to v3, this is VERY different syntax.  beforeSend is an ARRAY,
// so you can have mutlpipl beforeSend's, N.B. syntax is simpler if you define 
// beforeSend where you initialize your bugsnagClient, but that did not work for 
// this example.
bugsnagClient.config.beforeSend.push(function (report) {
        console.log("snag(bug);");
        var user_info = fGetUserData();
        var rstage = user_info["rstage"];

        if (rstage === "staging") {
          // to stop all staging errors from being reported, you have 2 options:
            report.ignore();
            // ignore is a new method that will stop the report, 
            // or you can just return false from the beforeSend.
            }
          // read the docs for all the many attributes you can modify here.
        report.app.releaseStage = rstage;
        report.user["name"] = user_info["user"];
      });


// metadata allows you to add any custom info that is relevant to your app.
// very usefgul for trackign A/B testing.  
//  You could also define metadata insdid the beforeSend (if for example, 
// the data changes throughout the user's interaction with your app.)
bugsnagClient.metaData = {
  company: {
      name: "Themyscira",
      transport: "invisible jet"
    }
  }

//   appVersion: '1.2.3',
//   releaseStage: 'staging',
//   notifyReleaseStages: [ 'staging', 'production' ],
//   user: { id: '007', name: 'Diana Prince', email: 'ww@amazons.com' },
// })


function notifyException() {
  try {
    JSON.parse('definitely not json')
  } catch (e) {
    // The above string won't parse as JSON but the caught error
    // won't automatically go to Bugsnag. `notifyException(err)`
    // provides a way to manually notify Bugasnag of errors you
    // caught but want to track
    bugsnagClient.notify(e)
  }
}

// notifyException();

// below syntax is like a 'log' to bugsnag.  
// It does not even require an error object, just a string name & message.
// Additional data is optional.
bugsnagClient.notify({
  name: "SeverityTest", 
  message: "Monkey pants!!!!!!1!!!!" 
},
  {severity: "info"
});



// bugsnagClient.notify(new Error('Koala!'), {
//   beforeSend: (report) => {    
//     report.updateMetaData('pants', {
//       request_id: 12345,
//       message_id: 854
//     })
//   }
// })



// *************************************
// FUNCTIONS TO TRIGGER JAVASCRIPT ERRORS
// *************************************

// handles the button for JavaScript Index error.
//**********************************************************




// pick a better error!  not reporting >:D 
function fJsRange(evt) {
    var user_info = fGetUserData();
    var num = 1;

    if (user_info["handling"] === "yes") {
        try {
            num.toPrecision(500);
        } 
        catch (e) {
            bugsnagClient.notify(e, "a handled Range Error - ta da!!");            
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
            bugsnagClient.notify(e, "a handled Reference Error - HUZZAH!");            
        }
        // action...?
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
            bugsnagClient.notify(e, "a handled Type Error - BOOYAH!");            
        }
            // action...?
    }
    else {
        // deliberate Type Error
        num.toUpperCase(); 
    }
}


// captures the data user has selected on the page,
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

