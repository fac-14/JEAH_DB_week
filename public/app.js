var learners = document.querySelector('.learners');
var teachers = document.querySelector('.teachers');
// as soon as loads, make XHR to /users

// Function to make XHR
function request(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
      var requestData = JSON.parse(xhr.responseText);
      cb(null, requestData);
    } else {
      cb("error" + xhr.responseType)
    }
  }
  xhr.open("GET", url, true);
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



request('/users',renderCallback);