const { indexHandler, publicHandler } = require('./handler.js');

const router = (request, response) => {
  const endpoint = request.url;
  if (endpoint === "/" ) {
    indexHandler(request,response)
  } else {
    publicHandler(request, response)
  } 

}

module.exports = router;