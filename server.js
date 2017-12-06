/**
 * Connect to the database and search using a criteria.
 */
"use strict";

// MongoDB
const dsn =  process.env.DBWEBB_DSN || "mongodb://localhost:27017/people";
var path = require('path');

// Express server
const express = require("express");
const app = express();

// Connect to database with mongoConnect
const db = require('./src/MongoConnect.js').mongoConnect(dsn, 'artists');



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
app.get("/update", async (req, res) => {
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
app.get("/delete", async (req, res) => {
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

        await db.close();

        res.json(data);
    }    catch (err) {
        console.log(err);
        res.json(err);
    }
});

/* Routes for client. */
app.use('/get', express.static(path.join(__dirname, 'client/public')));
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

    /* use clients 404 error page */
    res.status(err.status || 500);
});


module.exports = app;
