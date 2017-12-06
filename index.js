var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/download"] = requestHandlers.download;
handle["/upload"] = requestHandlers.upload;
server.start(router.route, handle);