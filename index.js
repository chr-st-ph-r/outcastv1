/*jslint node: true */
'use strict';

var express = require('express');
var fs = require('fs');
var engines = require('consolidate'); // for template management

var app = express();
app.use(express.static( __dirname ));

// from http://stackoverflow.com/a/16111469*
app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.get('/', function (req, res) {
    res.render('index.html');
});

app.listen(process.env.PORT || 5000);