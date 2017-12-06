# mongoConnect

[![Build Status](https://travis-ci.org/Nicklas766/mongo-connecter.svg?branch=master)](https://travis-ci.org/Nicklas766/mongo-connecter)

[![Maintainability](https://api.codeclimate.com/v1/badges/81e618dabfb2cc92e091/maintainability)](https://codeclimate.com/github/Nicklas766/mongo-connecter/maintainability)

[![Code Coverage](https://scrutinizer-ci.com/g/Nicklas766/mongo-connecter/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/Nicklas766/mongo-connecter/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/Nicklas766/mongo-connecter/badges/build.png?b=master)](https://scrutinizer-ci.com/g/Nicklas766/mongo-connecter/build-status/master)

This module lets you connect to your mongodb without hassle. It contains a
prebuilt api.

The functions are asynchronous and returns promises, therefore you'll need to
use `await` or `.then()`.

## Installation

```
npm install mongo-connecter --save
```

## Setup
```javascript
const dsn = "mongodb://localhost:27017/people";
const db  = require('mongo-connecter').connect(dsn, 'collection');
```

## How to use


**Fetch**
```javascript
const data = await db.fetch();
```

**Insert**
```javascript
var item = {
    name: req.body.name,
    wikipedia: req.body.wikipedia
};
const info = await db.insert(item);
```

**Update**
```javascript
var item = {
    name: req.body.name,
    wikipedia: req.body.wikipedia
};

await db.update(req.body.id, item);
```

**Remove**
```javascript
await db.remove(req.body.id);
```

**Close**
```javascript
await db.close();
```

**Example with express**
```javascript
// Create an object and return new list of objects
router.post("/insert", async (req, res) => {
    var item = {
        name: req.body.name,
        wikipedia: req.body.wikipedia,
        youtube: req.body.youtube
    };

    try {
        await db.insert(item);
        const data = await db.fetch();

        res.json(data);
    } catch (err) {
        console.log(err);
        res.json(err);
    }
});
```

## Testing

We use docker as testing enviroment. All code except `src` and `index.js` is basically just for
testing.

```
// Three containers for docker, mongodb, express, tests
npm run docker-build-start

// If you only want to test
npm run docker-build-start test
```
