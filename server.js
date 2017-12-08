/**
 * Server to setup enviroment for tests
 */
"use strict";

// Connect to database with mongo-connecter
const dsn =  process.env.DBWEBB_DSN || "mongodb://localhost:27017/people";
const db = require('./src/MongoConnect.js').mongoConnect(dsn, 'artists');
// Express server
var path = require('path');
const express = require("express");
const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));




// Return a JSON object with list of all documents within the collection.
app.get("/get", async (req, res) => {
    try {
        var data = await db.fetch();

        res.json(data);
    }    catch (err) {
        console.log(err);
        res.json(err);
    }
});

// Create an object and return new list of objects
app.post("/insert", async (req, res) => {
    var item = {
        name: req.body.name,
        wikipedia: req.body.wikipedia,
        youtube: req.body.youtube
    };

    try {
        await db.insert(item);
        const data = await db.fetch();

        res.json(data);
    }    catch (err) {
        console.log(err);
        res.json(err);
    }
});

// Update an object in collection
app.post("/update", async (req, res) => {
    var item = {
        name: req.body.name,
        wikipedia: req.body.wikipedia,
        youtube: req.body.youtube
    };

    try {
        await db.update(req.body.id, item);
        const data = await db.fetch();

        res.json(data);
    }    catch (err) {
        console.log(err);
        res.json(err);
    }
});

// Delete an object in the collection and return new
app.post("/delete", async (req, res) => {
    try {
        await db.remove(req.body.id);
        const data = await db.fetch();

        res.json(data);
    }    catch (err) {
        console.log(err);
        res.json(err);
    }
});


// Delete an object in the collection and return new
app.get("/reset", async (req, res) => {
    try {
        const data = await db.reset();

        res.json(data);
    }    catch (err) {
        console.log(err);
        res.json(err);
    }
});

/* Routes with 200 code. */
app.use('/get', express.static(path.join(__dirname, 'client/public')));
app.use('/insert', express.static(path.join(__dirname, 'client/public')));
app.use('/update', express.static(path.join(__dirname, 'client/public')));
app.use('/delete', express.static(path.join(__dirname, 'client/public')));
app.use('/reset', express.static(path.join(__dirname, 'client/public')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');

    err.status = 404;

    next(err);
});



// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development'
        ? err
        : {};

    res.status(err.status || 500);
});


module.exports = app;
