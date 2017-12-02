"use strict"

// Setting global metaData on the client object. Each error report will
// merge this object with any other metaData it receives via other means
bugsnagClient.metaData = {
  company: {
    name: "Themyscira",
    transport: "invisible jet"
  }
}

document.addEventListener ("DOMContentLoaded", function() 
    {
        // JS error event listeners
        $('#jsRangeError').on('click', fJsRange);
        $('#jsRefError').on('click', fJsRef);
        $('#jsTypeError').on('click', fJsType);


    } // closes anon function
); // closes DOM event listener
console.log("connected!!!!!!!");




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

notifyException();

bugsnagClient.notify({
  name: "ErrorName", 
  message: "Monkey pants!!!!!!1!!!!", 
  // beforeSend: function (report) {severity: "info";}
  // severity: "info"
});



bugsnagClient.notify(new Error('Koala!'), {
  beforeSend: (report) => {
    report.updateMetaData('pants', {
      request_id: 12345,
      message_id: 854
    })
  }
})

// captures the data user has selected on the page,
// to hand over to AJAX calls
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


// *************************************
// FUNCTIONS TO TRIGGER JAVASCRIPT ERRORS
// *************************************

// handles the button for JavaScript Index error.
function fJsRange(evt) {
    var user_info = fGetUserData();
    var num = 1;

    if (user_info["handling"] === "yes") {
        try {
            num.toPrecision(500);
        } 
        catch (e) {
            Bugsnag.notifyException(e, "a handled Range Error - ta da!!");            
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
            Bugsnag.notifyException(e, "a handled Reference Error - HUZZAH!");            
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
    if (user_info["handling"] === "yes") {
    var num = 1;
        try {
            num.toUpperCase(); 
        }
        catch (e) {
            Bugsnag.notifyException(e, "a handled Type Error - BOOYAH!");            
        }
            // action...?
    }
    else {
        // deliberate Type Error
        num.toUpperCase(); 
    }
}


