import DatastoreStore from "../src";
declare module "mocha" {
    interface ITestCallbackContext {
        store: DatastoreStore;
    }
}
