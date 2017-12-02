"use strict"


// Setting global metaData on the client object. Each error report will
// merge this object with any other metaData it receives via other means
bugsnagClient.metaData = {
  company: {
    name: "Acme Co.",
    country: "uk"
  }
}

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

// bugsnagClient.notify(new Error('Pants on fire!!!!!'), {
//   beforeSend: (report) => {
//     // report.severity: "info",
//     report.message: "Koala!!!"
//     })
//   }
// })

bugsnagClient.notify(new Error('Koala!'), {
  beforeSend: (report) => {
    report.updateMetaData('pants', {
      request_id: 12345,
      message_id: 854
    })
  }
})

var tracks = [
  { name: 'Quicksand', length: '2:13' },
  { name: 'A Kiss to Send Us Off', length: '4:16' },
  { name: 'Dig', length: '4:17' },
  { name: 'Anna Molly', length: '3:46' },
  { name: 'Love Hurts', length: '3:57' },
  { name: 'Light Grenades', length: '2:20' },
  { name: 'Earth to Bella (Part I)', length: '2:28' },
  { name: 'Oil and Water', length: '3:50' },
  { name: 'Diamonds and Coal', length: '3:47' },
  { name: 'Rogues', length: '3:56' },
  { name: 'Paper Shoes', length: '4:17' },
  { name: 'Pendulous Threads', length: '5:35' },
  { name: 'Earth to Bella (Part II)', length: '2:56' }
]

var longest = 0
for (var i = 0, secs; i <= tracks.length; i++) {
  secs = toSecs(tracks[i].length)
  if (secs > longest) longest = secs
}
alert(longest)

function toSecs(str) {
  var parts = str.split(':')
  return parts[0] * 60 + parts[1]
}
