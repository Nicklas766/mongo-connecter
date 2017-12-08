
const mongo = require("mongodb").MongoClient;
var ObjectId = require('mongodb').ObjectID;
/**
* mongoConnect
*
* Returns object with async functions for mongoDB actions.
*
* @param {string} dsn               DSN to connect to database.
* @param {string} collection        The collection to connect to
*
* @return {object}                  the functions
*
*
*/
const mongoConnect = (dsn, collection) => {
    // Connect and return collection
    let db;

    const connect = async () => {
        db        = await mongo.connect(dsn);
        const col = await db.collection(collection);

        return col;
    };


    /* Return async functions for mongoDB actions */
    return {
        async fetch(search = {}) {
            const col  = await connect();
            const data = col.find(search).toArray();

            await db.close();

            return data;
        },
        async insert(item) {
            const col  = await connect();
            const data = col.insert(item);

            await db.close();

            return data;
        },
        async update(id, item) {
            const col  = await connect();
            const data = col.update({  _id: ObjectId(id) }, { $set: item });

            await db.close();

            return data;
        },
        async remove(id) {
            const col  = await connect();
            const data = col.remove({ _id: ObjectId(id) });

            await db.close();

            return data;
        },

        async reset() {
            const col = await connect();

            await col.deleteMany({});
            await col.insert({
                name: "Jason Mraz",
                wikipedia: "https://sv.wikipedia.org/wiki/Jason_Mraz",
                youtube: "https://www.youtube.com/watch?v=bcQwIxRcaYs"
            });
            await col.insert({
                name: "Veronica Maggio",
                wikipedia: "https://sv.wikipedia.org/wiki/Veronica_Maggio",
                youtube: "https://www.youtube.com/watch?v=sYMByMHwPRI"
            });

            const data = col.find({}).toArray();

            await db.close();

            return data;
        },
    };
};

module.exports = { mongoConnect };
