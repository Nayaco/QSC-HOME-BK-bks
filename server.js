const http = require("http");
const url = require("url");
const util = require('util');

function start(route, handle) {
  function onRequest(request, response) {
    const pathname = url.parse(request.url,true).pathname;
    const dataname = url.parse(request.url,true).query.file;
    console.log("Request for " + pathname + " received.");
    console.log(dataname);
    route(handle,request,response,pathname,dataname);
    }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;