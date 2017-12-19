/**
* MongoConnecter module
*
*/
"use strict";
const mongo = require("mongodb").MongoClient;
var ObjectId = require('mongodb').ObjectID;


/**
* Returns db and collection
* @param {string} dsn
* @param {string} collectionName     The collection to connect to
*
* @return {object}                  db and collection
*/
const connect = async (dsn, collectionName) => {
    const db  = await mongo.connect(dsn);
    const col = await db.collection(collectionName);

    return {db, col};
};

/**
* Uses the connect(dsn, collection) to get db and col, then we send in the
* col to the sent in functions from  "async (...funcs)", then we return
* the returned value from the last function
* @param {string} dsn
* @param {string} collectionName
*
* @return {promise}
*/
const colDo = (dsn, collectionName) => async (...funcs) => {
    const {db, col} = await connect(dsn, collectionName);

    let lastPromise = Promise.resolve();

    for (let func of funcs) {
        lastPromise = await func(col);
    }

    db.close();
    return lastPromise;
};

/**
* init
* Returns object with async functions for mongoDB actions.
*
* @param {string} dsn               DSN to connect to database.
* @param {string} collection        The collection to connect to
*
* @return {object}                  the functions
*
*/
const init = (dsn, collectionName) => {
    const collectionDo = colDo(dsn, collectionName);

    return {
        fetch: (search = {}) => collectionDo(col => col.find(search).toArray()),
        insert: (item) => collectionDo(col => col.insert(item)),
        update: (id, item) => collectionDo(
            col => col.update({ _id: ObjectId(id) }, { $set: item })
        ),
        remove: (id) => collectionDo(col => col.remove({ _id: ObjectId(id) })),
        insertAndFetch: (item) => collectionDo(
            col => col.insert(item),
            col => col.find(item).toArray()
        ),
        updateAndFetch: (item) => collectionDo(
            col => col.insert(item),
            col => col.find(item).toArray()
        ),
        reset: () => collectionDo(
            col => col.deleteMany({}),
            col => col.insert({
                name: "Jason Mraz",
                wikipedia: "https://sv.wikipedia.org/wiki/Jason_Mraz",
                youtube: "https://www.youtube.com/watch?v=bcQwIxRcaYs"
            }),
            col => col.insert({
                name: "Veronica Maggio",
                wikipedia: "https://sv.wikipedia.org/wiki/Veronica_Maggio",
                youtube: "https://www.youtube.com/watch?v=sYMByMHwPRI"
            }),
            col => col.find({}).toArray()
        ),
        collectionDo
    };
};


module.exports = { init };
