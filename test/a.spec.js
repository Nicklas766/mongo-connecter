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

describe('try out MongoConnecter', function() {
    it('should return array, [0].name == Jason Mraz, [1].name == Veronica Maggio', function(done) {
        request(app).get("/reset")
            .set('Accept', 'application/json')
            .expect(200)
            .then(function (res) {
                assert(res.body[0].name == "Jason Mraz"),
                assert(res.body[1].name == "Veronica Maggio");
                done();
            }).catch(done);
    });
    it('try fetch, should return same as above', function(done) {
        request(app).get("/get")
            .set('Accept', 'application/json')
            .expect(200)
            .then(function (res) {
                assert(res.body[0].name == "Jason Mraz"),
                assert(res.body[1].name == "Veronica Maggio");
                done();
            }).catch(done);
    });
    it('try collectionDo, should return same as above', function(done) {
        request(app).get("/col")
            .set('Accept', 'application/json')
            .expect(200)
            .then(function (res) {
                assert(res.body[0].name == "Jason Mraz"),
                assert(res.body[1].name == "Veronica Maggio");
                done();
            }).catch(done);
    });
    it('should create new item at index 2', function(done) {
        request(app).post("/insert")
            .set('Accept', 'application/json')
            .send({
                name: "James Bond",
                wikipedia: "none",
                youtube: "none"
            })
            .expect(200)
            .then(function (res) {
                assert(res.body[2].name == "James Bond");
                done();
            }).catch(done);
    });
    it('should exit with success', function() {
        process.exit(0);
    });
});
