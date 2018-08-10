const { indexHandler, publicHandler, badUrl, userHandler, postHandler } = require('./handler.js');

const router = (request, response) => {
  const endpoint = request.url;
  
  if (endpoint === "/" ) {
    indexHandler(request,response)
  } else if ( endpoint.includes("public") ){
    publicHandler(request, response)
  } else if ( endpoint === "/users" ) {
    userHandler(request, response)
  } else if ( endpoint === "/submit" ) {
    postHandler(request, response);
  } else {
    badUrl(request,response)
  }

}

module.exports = router;