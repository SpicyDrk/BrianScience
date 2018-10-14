var express = require('express');
require('dotenv').config();
var app = express();
var fs = require('fs');
var http = require('http');
var https = require('https');


app.get('/',function(req,res){
    res.send('<h1>David is a hoe</h1>')
});

//creates the server+redirect from http to https.
if (process.env.ENV){
    if (process.env.ENV == 'production'){
        var sslOptions = {
            key: fs.readFileSync('/root/ssl/BrianScience.key'),   
            cert: fs.readFileSync('/root/ssl/Brian_Science.crt'),   
            ca: fs.readFileSync ('/root/ssl/Brian_Science.ca-bundle')   
        };        
        https.createServer(sslOptions, app).listen(443)
        http.createServer(function (req, res) {
            res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
            res.end();
        }).listen(80);
        console.log('Node started on port 80 and 443')
    }  else {
        http.createServer(app).listen(80);
        console.log('Node started on port 80')
    }
} else {
    http.createServer(app).listen(80);
    console.log('Node started on port 80')
}



