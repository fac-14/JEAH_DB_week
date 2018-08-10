var requests = document.querySelector('.requests');
var offers = document.querySelector('.offers');
var offerTable = document.querySelector('#offers-table');
var requestTable = document.querySelector('#requests-table');

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
    var requestArray = data.requests;
    var offerArray = data.offers;
    renderRows(requestArray, requestTable);
    renderRows(offerArray, offerTable);
  }
} 

function renderRows(array, table) {
  array.forEach(element => {
    var skill;
    if (element.skill_offers) {
      skill = element.skill_offers
    } else {
      skill = element.skill_requests
    }
    var row = document.createElement("tr");
    // create name cell
    var name = document.createElement("td");
    name.textContent = element.name;
    row.appendChild(name);
    // create skill cell
    var skillCell = document.createElement("td");
    skillCell.textContent = skill;
    row.appendChild(skillCell);
    // create email cell
    var email = document.createElement("td");
    email.textContent = element.email;
    row.appendChild(email);
    // append row
    table.appendChild(row);
  });
}

function openTab(evt, tabToOpen) {
  var tabcontent, tablinks;
  tabcontent = document.querySelectorAll(".tabcontent");
  tabcontent.forEach( function(el) {
    el.style.display = "none";
  });
  tablinks = document.querySelectorAll(".tablinks");
  tablinks.forEach( function(el) {
    el.className = el.className.replace(" active", "");
  });
  document.getElementById(tabToOpen).style.display = "block";
  evt.currentTarget.className += " active";
}

request("GET", '/users', renderCallback);