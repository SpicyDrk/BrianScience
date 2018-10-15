var express = require('express');
require('dotenv').config();
var app = express();
var socketApp = express();
var fs = require('fs');
var http = require('http');
var https = require('https');
var socket;
if (process.env.ENV == 'production'){
    socket = require('socket.io')(http);
} else {
    socket = require('socket.io')(https);
}

var socketServer = socket.listen(3000);
var io = socket.listen(socketServer);

io.sockets.on('connection', function(sock){
    console.log(sock)
})

app.get('/', function (req, res) {
    res.sendFile('views/home.html', {root: __dirname })
});

//creates the server+redirect from http to https.
console.log('Node running in env: ' + process.env.ENV)
if (process.env.ENV) {
    if (process.env.ENV == 'production') {
        var sslOptions = {
            key: fs.readFileSync('/root/ssl/BrianScience.key'),
            cert: fs.readFileSync('/root/ssl/Brian_Science.crt'),
            ca: fs.readFileSync('/root/ssl/Brian_Science.ca-bundle')
        };
        https.createServer(sslOptions, app).listen(443)
        http.createServer(function (req, res) {
            res.writeHead(301, {
                "Location": "https://" + req.headers['host'] + req.url
            });
            res.end();
        }).listen(80);
        console.log('Node started on port 80 and 443')
    } else {
        http.createServer(app).listen(80);
        console.log('Node started on port 80')
    }
} else {
    http.createServer(app).listen(80);
    console.log('Node started on port 80')
}

