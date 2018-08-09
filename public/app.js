var learners = document.querySelector('.learners');
var teachers = document.querySelector('.teachers');

// Function to make XHR
function request(type, url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
      var requestData = JSON.parse(xhr.responseText);
      if (cb) {
        cb(null, requestData);
      }
    } else {
      if (cb) {
        cb("error" + xhr.responseType)
      }
    }
  }
  xhr.open(type, url, true);
  xhr.send();
}

// Callback to render result
function renderCallback(err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data)
    learners.append(data.requests);
    teachers.append(data.offers);
  }
} 

request("GET", '/users', renderCallback);