/*jshint node:true*/
'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    app = express(),
    port = process.env.PORT || 8000,
    routes;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/ping', function(req, res, next) {
    console.log(req.query);
    res.send('pong');
});
app.use("/src", express.static(path.resolve(__dirname + "/../client/app/")));
app.use("/assets", express.static(path.resolve(__dirname + "/../client/assets")));
app.use("/vendor", express.static(path.resolve(__dirname + "/../node_modules/")));

app.use(require('./util/error_handler'));
app.get("/*", function (req, res) {
    res.render('index', { deps: require('./client-deps') });
});
app.listen(port, function() {
    console.log('************************');
    console.log('Server is go');
    console.log('Listening on port ' + port);
});
