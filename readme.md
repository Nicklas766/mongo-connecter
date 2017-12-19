# mongo-connecter

[![Build Status](https://travis-ci.org/Nicklas766/mongo-connecter.svg?branch=master)](https://travis-ci.org/Nicklas766/mongo-connecter)
[![Maintainability](https://api.codeclimate.com/v1/badges/81e618dabfb2cc92e091/maintainability)](https://codeclimate.com/github/Nicklas766/mongo-connecter/maintainability)
[![Code Coverage](https://scrutinizer-ci.com/g/Nicklas766/mongo-connecter/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/Nicklas766/mongo-connecter/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/Nicklas766/mongo-connecter/badges/build.png?b=master)](https://scrutinizer-ci.com/g/Nicklas766/mongo-connecter/build-status/master)

This module lets you connect to your mongodb without hassle. It also contains a prebuilt api.

When you call a function it connects to your mongodb and the collection, executes the function/functions you want. Then it closes the db.
The functions are asynchronous and returns promises, therefore you'll need to use `await` or `.then()`.


## Installation

```
npm install mongo-connecter --save
```

## Setup
```javascript
const dsn = "mongodb://localhost:27017/people"
const myCollection  = require('mongo-connecter').init(dsn, 'collection')
```
I will use this for my documentation below:
```javascript
const artists  = require('mongo-connecter').init(dsn, 'artists')
```

## How to use
**`collectionDo`:**
It will execute all functions but return the last,
```javascript
data = await artists.collectionDo(
    col => col.insert({name: 'Jason'}),
    col => col.findOne({name: 'Jason'})
);
```
## How to use prebuilt api
You only need `collectionDo()` but you can also use the prebuilt api:

**`fetch`:**
```javascript
const data = await myCollection.fetch()
// or
const data = await artists.fetch({name: "John"}) // returns array with artists with name john
```
**`fetchOne`:**
```javascript
const data = await myCollection.fetchOne()
```
**`insert`:**
```javascript
var item = {
    name: "Veronica",
    wikipedia: 'link'
}
const info = await artists.insert(item)
```

**`update`:**
```javascript
var item = {
    name: 'new name',
    wikipedia: 'new link'
}
await artists.update(_id, item)
```

**`remove`:**
```javascript
await artists.remove(_id)
```

**`insertAndFetch(item)`:** inserts and then returns your new item
**`updateAndFetch(_id, item)`:** updates and then returns your updated item



**Example with express**
```javascript
// Create an object and return list of all objects
router.post("/insert", async (req, res) => {
    var item = {
        name: req.body.name,
        wikipedia: req.body.wikipedia,
        youtube: req.body.youtube
    }

    try {
        await artists.insert(item)
        const data = await artists.fetch()

        res.json(data)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})
```

## Testing

We use docker as testing enviroment.

```
// starts mongodb and then test
npm run docker-build-start

// If you only want to start test
npm run docker-build-start test
```
