const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const { addToDatabase } = require('./postQueries');
const getDatabase = require('./getQueries');

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

const getDBHandler = (req, res) => {
  getDatabase ( (result) => {
    res.writeHead(200, { 'Content-Type' : 'application/json' });
    res.end(JSON.stringify(result));
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

module.exports = { indexHandler, publicHandler, badUrl, getDBHandler, postHandler };