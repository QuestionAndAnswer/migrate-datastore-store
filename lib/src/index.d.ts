/// <reference types="google-cloud__datastore" />
import Datastore = require("@google-cloud/datastore");
export declare const DEFAULT_DATASTORE_STORE_KIND = "_MIGRATIONS_STATE_";
export declare class DatastoreStore {
    private readonly db;
    private readonly kind;
    constructor(db: Datastore, kind?: string);
    load(callback: (err: Error | null, set: object | null) => void): Promise<void>;
    save(set: object, callback: (err: Error | null) => void): Promise<void>;
    private getLastState();
}
export default DatastoreStore;
