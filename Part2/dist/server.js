"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var metrics_1 = require("./metrics");
var app = express();
var port = process.env.PORT || '8080';
app.get('/metrics.json', function (req, res) {
    metrics_1.MetricsHandler.get(function (err, result) {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');
app.get('/', function (req, res) { return res.render('root.ejs'); });
app.get('/hello', function (req, res) { return res.render('anonymous.ejs'); });
app.get('/hello/:name', function (req, res) { return res.render('hello.ejs', { name: req.params.name, metrics: metrics_1.MetricsHandler }); });
app.listen(port, function (err) {
    if (err) {
        throw err;
    }
    console.log("server is listening on port " + port);
});