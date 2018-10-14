var express = require('express');
var app = express();
var fs = require('fs');
var http = require('http');
var https = require('https');
var sslOptions = {
    key: fs.readFileSync('/root/ssl/BrianScience.key'),   
    cert: fs.readFileSync('/root/ssl/Brian_Science.crt'),   
    ca: fs.readFileSync ('/root/ssl/Brian_Science.ca-bundle')   
   };

app.get('/',function(req,res){
    res.send('<h1>David is a hoe</h1>')
});

//creates the server+redirect from http to https.
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);
https.createServer(sslOptions, app).listen(443)

