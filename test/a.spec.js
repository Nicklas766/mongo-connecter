/*eslint-disable no-unused-vars*/
// MongoDB
// Mocha
var mocha = require('mocha');
var it = mocha.it;
var describe = mocha.describe;
// import { mongoConnect } from '../../src/MongoConnect.js';
/*eslint-enable no-unused-vars*/
var request = require('supertest');
var app = require('../server.js');
// const dsn = process.env.DBWEBB_DSN || "mongodb://localhost:27017/test";
// const db = require('../../src/MongoConnect.js').mongoConnect(dsn, 'artists');
// const db = mongoConnect(dsn, 'artists');
// // Connect to database with mongoConnect
//
var assert = require('assert');
//
//
// beforeEach(async function() {
//   await db.insert({name: "Jason Mraz", wikipedia:"hello", youtube:"youtube"});
// });

// console.log(wrapper.debug());

describe('try out the fetch', function() {
    it('should return array which contains array[0].name Jason Mraz', function(done) {
        request(app).get("/reset")
            .set('Accept', 'application/json')
            .expect(200)
            .then(function (res) {
                assert(res.body[0].name == "Jason Mraz");
                done();
            }).catch(done);
    });
    it('should exit with success', function() {
        process.exit(0);
    });
});
