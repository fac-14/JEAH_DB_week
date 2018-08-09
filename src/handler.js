const fs = require('fs');
const path = require('path');
const dbconnection = require('./database/db_connection'); // this is the pool
const querystring = require('querystring');
const addToDatabase = require('./postQueries')

const mimeTypes = {
  html: "text/html",
  css: "text/css",
  js: "application/javascript"
}

const buildPath = (file) => {
  return path.join(__dirname,'..','public', file);
}

const indexHandler = (req, res) => {
  fs.readFile(buildPath('index.html'),(err,file) => {
    if (err) {
      res.writeHead(500,{ 'Content-Type' : 'text/html' });
      res.end('Sorry, we could not retrieve the web page');
      console.log(err);
    } else {
      res.writeHead(200, { 'Content-Type' : 'text/html' });
      res.end(file);
    }
  })
}

const publicHandler = (req, res) => {
  const fileName = req.url.split("public/")[1]
  const extension = fileName.split(".")[1];
  fs.readFile(buildPath(fileName),(err,file) => {
    if (err) {
      res.writeHead(500,{ 'Content-Type' : 'text/html' });
      res.end('Sorry, we could not retrieve the web page');
      console.log(err);
    } else {
      res.writeHead(200, { 'Content-Type' : `${mimeTypes[extension]}` });
      res.end(file);
    }
  })
}

const requestQuery = `SELECT users.name, users.email, skill AS skill_requests FROM users INNER JOIN requests ON users.id = requests.user_id INNER JOIN skills ON requests.skill_id = skills.id;`;

const offerQuery = `SELECT users.name, users.email, skill AS skill_offers FROM users INNER JOIN offers ON users.id = offers.user_id INNER JOIN
skills ON offers.skill_id = skills.id;`;

const userHandler = (req, res) => {
  let result = {};
  dbconnection.query(requestQuery, (err, requestData) => {
    if (err) throw err;
    else {
      result.requests = requestData.rows;
      dbconnection.query(offerQuery, (err, offerData) => {
        result.offers = offerData.rows;
        res.writeHead(200, { 'Content-Type' : 'application/json' });
        res.end(JSON.stringify(result));
      });
    }
  });
}

const postHandler = (req, res) => {
    let data = "";
    req.on('data',(chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      const formData = querystring.parse(data);
      const callback = () => {
        res.writeHead(302, {'Location' : '/'} );
        res.end();
      }
      addToDatabase(formData.name,formData.email,formData.skill,formData.option,callback);
    })
}


const badUrl = (req, res) => {
  res.writeHead(404,{ 'Content-Type' : 'text/html' });
  res.end('This is not the url you are looking 404');
}

module.exports = { indexHandler, publicHandler, badUrl, userHandler, postHandler };