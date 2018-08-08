const { indexHandler } = require('./handler.js');

const router = (request, response) => {
  const endpoint = request.url;
  if (endpoint === "/" || endpoint === "/public") {
    indexHandler(request,response)
  }

}




module.exports = router;