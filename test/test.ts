import Datastore = require("@google-cloud/datastore");
import DatastoreStore from "../src";
import { assert } from "chai";
import { KEY } from "@google-cloud/datastore";
import * as migrate from "migrate";
import * as path from "path";

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
        this.store.save(
            {
                lastRun: 1,
                migrations: []
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
                    assert.deepEqual(data, { lastRun: 1, migrations: [] });
                    done();
                } catch (err) {
                    done(err);
                }
            }
        );
    });
});

describe("Integration with migrate", function () {
    after(cleanupMigrationKind);

    it("Load and run up migration", function (done: MochaDone) {
        migrate.load({
            stateStore: new DatastoreStore(db, STORE_KIND),
            migrationsDirectory: path.resolve("./test/migrations")
        }, function (err, set) {
            if (err) {
                done(err);
            }

            set.up(setErr => {
                if (setErr) {
                    done(setErr);
                }

                done();
            });
        });
    });

    it("Load and run down migration", function (done: MochaDone) {
        migrate.load({
            stateStore: new DatastoreStore(db, STORE_KIND),
            migrationsDirectory: path.resolve("./test/migrations")
        }, function (err, set) {
            if (err) {
                done(err);
            }

            set.down(setErr => {
                if (setErr) {
                    done(setErr);
                }

                done();
            });
        });
    });
});