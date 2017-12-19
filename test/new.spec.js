/*eslint-disable no-unused-vars*/
var mocha = require('mocha');
var it = mocha.it;
var describe = mocha.describe;
/*eslint-enable no-unused-vars*/

const dsn =  process.env.DBWEBB_DSN || "mongodb://localhost:27017/people";
const artists = require('../index.js').init(dsn, 'artists');

var assert = require('assert');
//
//
// beforeEach(async function() {
//   await db.insert({name: "Jason Mraz", wikipedia:"hello", youtube:"youtube"});
// });

// console.log(wrapper.debug());

describe('try out MongoConnectereee', function() {
    it("Should reset database", async () => {
        await artists.reset();
        const data = await artists.fetch({});

        assert({}, data);
    });
    it("Should add Jason and Veronica to collection", async () => {
        await artists.insert({name: 'Jason'});
        await artists.insert({name: 'Veronica'});
        const data = await artists.fetch({});

        assert(data[0].name === 'Jason');
        assert(data[1].name === 'Veronica');
    });
    it("Should fetch array with one index [0].name == Veronica", async () => {
        const data = await artists.fetch({name: 'Veronica'});

        assert(data[0].name === 'Veronica');
        assert(data.length, 1);
    });
    it("Should update Veronica to Veronica Maggio and add obj.greet = hello", async () => {
        const data = await artists.fetch({name: 'Veronica'});

        assert.equal(data.length, 1);
        assert.equal(data[0].name, 'Veronica');

        // update
        await artists.update(data[0]._id, {name: 'Veronica Maggio', greet: "hello"});
        const updatedData = await artists.fetch({name: 'Veronica Maggio'});


        assert.equal(updatedData[0].greet, 'hello');
    });

    it("Should update Jason to Jason Mraz with collectionDo", async () => {
        const data = await artists.fetchOne({name: 'Jason'});

        assert.equal(data.name, 'Jason');

        // Update
        await artists.collectionDo(col =>
            col.update({ name: 'Jason' }, { $set: {name: 'Jason Mraz'} })
        );
        const updatedData = await artists.fetchOne({name: 'Jason Mraz'});

        assert.equal(updatedData.name, 'Jason Mraz');
        assert.notEqual(updatedData.name, 'Jason');
    });

    it("Should insert John Mayer and then return him", async () => {
        const data = await artists.insertAndFetch({name: 'John Mayer'});

        assert.equal(data.name, 'John Mayer');
        assert.notEqual(data.name, 'Jason');
    });

    it("Should update John Mayer to Eminem and return to check", async () => {
        const john = await artists.fetchOne({name: 'John Mayer'});
        const eminem = await artists.updateAndFetch(john._id, {name: 'Eminem'});

        assert.equal(eminem.name, 'Eminem');
        assert.notEqual(eminem.name, 'John');

        // Fetch all so John mayer not in array
        const people = await artists.fetch();

        assert.equal(people.length, 3);
        assert.notEqual(people[0].name, 'John Mayer');
        assert.notEqual(people[1].name, 'John Mayer');
        assert.notEqual(people[2].name, 'John Mayer');
    });

    it("Should remove Eminem", async () => {
        const eminem = await artists.fetchOne({name: 'Eminem'});

        await artists.remove(eminem._id);

        // Fetch all so Eminem not in array
        const people = await artists.fetch();

        assert.equal(people.length, 2);
        assert.notEqual(people[0].name, 'Eminem');
        assert.notEqual(people[1].name, 'Eminem');
    });
});
