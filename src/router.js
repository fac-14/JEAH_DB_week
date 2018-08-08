const { indexHandler, publicHandler, badUrl } = require('./handler.js');

const router = (request, response) => {
  const endpoint = request.url;
  
  if (endpoint === "/" ) {
    indexHandler(request,response)
  } else if ( endpoint.includes("public") ){
    publicHandler(request, response)
  } else {
    badUrl(request,response)
  }

}

module.exports = router;