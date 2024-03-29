import { Datastore } from "@google-cloud/datastore";

export const DEFAULT_DATASTORE_STORE_KIND = "_MIGRATIONS_STATE_";

export class DatastoreStore {
    constructor(
        private readonly db: Datastore,
        private readonly kind: string = DEFAULT_DATASTORE_STORE_KIND
    ) { }

    public async load(callback: (err: Error | null, set: object | null) => void): Promise<void> {
        try {
            const state = await this.getLastState();

            callback(null, state || {});
        } catch (err) {
            callback(err, null);
        }
    }

    public async save(set: object, callback: (err: Error | null) => void): Promise<void> {
        try {
            const state = await this.getLastState();

            await this.db.save({
                key: state ? state[Datastore.KEY] : this.db.key([this.kind]),
                // stringify -> parse - to exclude non serializable fields
                data: JSON.parse(JSON.stringify({
                    // @ts-ignore
                    lastRun: set.lastRun,
                    // @ts-ignore
                    migrations: set.migrations
                }))
            });

            callback(null);
        } catch (err) {
            callback(err);
        }
    }

    private async getLastState(): Promise<object | null> {
        const [[result]] = await this.db.createQuery(this.kind)
            .run();

        return result;
    }
}

export default DatastoreStore;