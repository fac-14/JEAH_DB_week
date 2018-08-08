const fs = require('fs');
const path = require('path');

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
  const extension = req.url.split(".")[1];
  fs.readFile(buildPath(req.url),(err,file) => {
    if (err) {
      res.writeHead(500,{ 'Content-Type' : 'text/html' });
      res.end('Sorry, we could not retrieve the web page');
      console.log(err);
    } else {
      res.writeHead(200, `{ 'Content-Type' : ${mimeTypes[extension]} }`);
      res.end(file);
    }
  })
}


module.exports = { indexHandler, publicHandler };