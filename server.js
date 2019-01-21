var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var mime = require('./mime');

var port = 9876;
var root
var index = "index.html";

var server;
var logAppend;

function startFileServer(inputPort) {
    var userPort = Number(inputPort);
    if (userPort == 0) {
        port = 9876;
    } else if (userPort < 1024 || userPort > 49151) {
        appendLog('Port range: 1024-49151 !');
        return false;
    } else {
        port = userPort;
    }
    if (root === undefined || root === null) {
        appendLog('Specify file folder first.');
        return false;
    } else {
        try {
            server = http.createServer(function (request, response) {
                var realPath = url.parse(request.url).pathname;

                if (realPath.charAt(realPath.length - 1) == "/") {
                    realPath += index;
                }

                realPath = realPath.replace(/\.\./g, '');
                var realPath = root + realPath;

                var ext = path.extname(realPath);
                ext = ext ? ext.slice(1) : 'unknown';

                fs.exists(realPath, function (exists) {
                    console.log('path.exists--%s', exists);
                    if (!exists) {
                        response.writeHead(404, {
                            'Content-Type': 'text/plain'
                        });

                        response.write("This request URL " + realPath + " was not found on this server.");
                        response.end();

                        appendLog("File: " + realPath + " NOT EXIST");
                    } else {
                        fs.readFile(realPath, "binary", function (err, file) {
                            if (err) {
                                response.writeHead(500, {
                                    'Content-Type': 'text/plain'
                                });
                                response.end(err + '');
                                appendLog("Serve file: " + realPath + " FAILED, " + err);
                            } else {
                                var contentType = mime[ext] || "text/plain";
                                response.writeHead(200, {
                                    'Content-Type': contentType
                                });

                                response.write(file, "binary");
                                response.end();

                                appendLog("File: " + realPath + " served");
                            }
                        })
                    }
                });
            }).listen(port);
            appendLog('Server running at port: ' + port);
            return true;
        } catch (err) {
            appendLog('' + err);
            return false;
        }
    }
}

function appendLog(content) {
    if (logAppend) {
        logAppend(content);
    }
}

function stopFileServer() {
    try {
        server.close();
        appendLog('Server with port: ' + port + ' stopped');
        server = null;
        return true;
    } catch (err) {
        appendLog('' + err);
        return false;
    }
}

module.exports = {
    start: startFileServer,
    stop: stopFileServer,
    setFolder: function (path) {
        root = path;
    },
    isServerStop: function () {
        return server === undefined || server === null;
    },
    regLogAppend: function (f) {
        logAppend = f;
    }
};
