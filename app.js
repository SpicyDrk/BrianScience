var express = require('express');
require('dotenv').config();
var app = express();
var fs = require('fs');
var http = require('http');
var https = require('https');
var socket = require('socket.io');
var httpServer;
var httpsServer;


app.use(express.static('public'));

//creates the server+redirect from http to https.
console.log('Node running in env: ' + process.env.ENV + ' And port ' +process.env.PORT)
if (process.env.ENV == 'production') {
    var sslOptions = {
        key: fs.readFileSync('/root/ssl/BrianScience.key'),
        cert: fs.readFileSync('/root/ssl/Brian_Science.crt'),
        ca: fs.readFileSync('/root/ssl/Brian_Science.ca-bundle')
    };
    httpsServer = https.createServer(sslOptions, app).listen(443)
    httpServer = http.createServer(function (req, res) {
        res.writeHead(301, {
            "Location": "https://" + req.headers['host'] + req.url
        });
        res.end();
    }).listen(80);
    console.log('Node started on port 80 and 443')
} else {
    httpServer = http.createServer(app).listen(80);
    console.log('Node started on port 80')
}

var io = socket(httpServer);
io.on('connection', function(e){
    console.log(e.id);
})