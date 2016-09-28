/*jshint node:true*/
'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    glob = require('glob'),
    path = require('path'),
    app = express(),
    port = process.env.PORT || 8000,
    src_deps = glob.sync('**/*.module.js', {
        cwd: 'client',
        ignore: '**/*.spec.js'
    }).concat(glob.sync('**/*.js', {
        cwd: 'client',
        ignore: ['**/*.module.js', '**/*.spec.js']
    })),
    vendor_deps = require('./client-deps');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/ping', function(req, res, next) {
    console.log(req.query);
    res.send('pong');
});
app.use("/src", express.static(path.resolve(__dirname + "/../client/")));
app.use("/assets", express.static(path.resolve(__dirname + "/../client/assets")));
app.use("/vendor", express.static(path.resolve(__dirname + "/../node_modules/")));

app.use(require('./util/error_handler'));
app.get("/*", function (req, res) {
    res.render('index', {
        vendor_deps: vendor_deps,
        src_deps: src_deps
    });
});
app.listen(port, function() {
    console.log('************************');
    console.log('Server is go');
    console.log('Listening on port ' + port);
});
