# migrate-datastore-store

Migrations state storage for [node-migrate](https://www.npmjs.com/package/migrate)

Written on **TypeScript** and provides definition files out of the box. 

## API

**```DatastoreStore(db, [kind])```**
- ```db```: Datastore instance in which state will be written
- ```kind```: Datastore kind in which state will be written. Default: ```_MIGRATIONS_STATE_```

## Example

ES6
```javascript
import { DatastoreStore } from "migrate-datastore-store"; //also avaialbale with default import
import * as Datastore from "@google-cloud/datastore";
import * as migrate from "migrate";

const db = new Datastore({});

migrate.load({
    stateStore: new DatastoreStore(db, "MY_CUSTOM_KIND")
}, function (err, set) {
    ...
});
```

or ES5
```javascript
const DatastoreStore = require("migrate-datastore-store").DatastoreStore;
const migrate = require("migrate");

const db = require("@google-cloud/datastore")({});

migrate.load({
    stateStore: new DatastoreStore(db, "MY_CUSTOM_KIND")
}, function (err, set) {
    ...
});
```

