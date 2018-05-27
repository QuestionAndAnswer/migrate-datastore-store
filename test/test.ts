import Datastore = require("@google-cloud/datastore");
import DatastoreStore from "../src";
import { assert } from "chai";
import { KEY } from "@google-cloud/datastore";

const db = new Datastore({});

declare module "mocha" {
    interface ITestCallbackContext {
        store: DatastoreStore;
    }
}

const STORE_KIND = "_TEST_MIGRATIONS_KIND_";
const CONSISTENCY_TIMEOUT = 4000;

async function cleanupMigrationKind (): Promise<void> {
    const [records] = await db.createQuery(STORE_KIND)
        .select("__key__")
        .run();

    if (records.length) {
        await db.delete(records.map(r => r[KEY]));
    }
}

describe("Basic", function () {
    before(cleanupMigrationKind);
    after(cleanupMigrationKind);

    it("Creation", function () {
        this.store = new DatastoreStore(db, STORE_KIND);
    });

    it("Setting", function (done: MochaDone) {
        this.store.set(
            {
                param: 1
            },
            function (err) {
                done(err);
            }
        );
    });

    it("Wait datastore consistency for ", function (done: MochaDone) {
        setTimeout(done, CONSISTENCY_TIMEOUT);
    });

    it("Loading", function (done: MochaDone) {
        this.store.load(
            function (err: Error, data: object) {
                if (err) {
                    done(err);
                }

                try {
                    assert.deepEqual(data, { param: 1 });
                    done();
                } catch (err) {
                    done(err);
                }
            }
        );
    });
});