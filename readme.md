# mongoConnect

[![Build Status](https://travis-ci.org/Nicklas766/bth-ramverk2.svg?branch=master)](https://travis-ci.org/Nicklas766/bth-ramverk2)


This module lets you connect to your mongodb without hassle. It contains a
prebuilt api.

The functions are asynchronous and returns promises, therefore you'll need to
use `await` or `.then()`.

## Installation

```
npm install mongo-connecter --save
```

## Setup
```
const dsn = "mongodb://localhost:27017/people";
const db  = require('mongo-connecter').connect(dsn, 'collection');
```

## How to use


**Fetch**
```
const data = await db.fetch();
```

**Insert**
```
var item = {
    name: req.body.name,
    wikipedia: req.body.wikipedia
};
const info = await db.insert(item);
```

**Update**
```
var item = {
    name: req.body.name,
    wikipedia: req.body.wikipedia
};

await db.update(req.body.id, item);
```

**Remove**
```
await db.remove(req.body.id);
```

**Close**
```
await db.close();
```

**Example with express**
```
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
