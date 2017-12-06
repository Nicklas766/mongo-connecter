'use strict';

const connect = {};

connect.connect = require('./src/MongoConnect.js').mongoConnect;


module.exports = connect;
