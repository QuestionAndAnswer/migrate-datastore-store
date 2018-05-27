"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Datastore = require("@google-cloud/datastore");
var src_1 = require("../src");
var chai_1 = require("chai");
var datastore_1 = require("@google-cloud/datastore");
var db = new Datastore({});
var STORE_KIND = "_TEST_MIGRATIONS_KIND_";
var CONSISTENCY_TIMEOUT = 4000;
function cleanupMigrationKind() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, records;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4, db.createQuery(STORE_KIND)
                        .select("__key__")
                        .run()];
                case 1:
                    _a = __read.apply(void 0, [_b.sent(), 1]), records = _a[0];
                    if (!records.length) return [3, 3];
                    return [4, db.delete(records.map(function (r) { return r[datastore_1.KEY]; }))];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3: return [2];
            }
        });
    });
}
describe("Basic", function () {
    before(cleanupMigrationKind);
    after(cleanupMigrationKind);
    it("Creation", function () {
        this.store = new src_1.default(db, STORE_KIND);
    });
    it("Setting", function (done) {
        this.store.set({
            param: 1
        }, function (err) {
            done(err);
        });
    });
    it("Wait datastore consistency for ", function (done) {
        this.timeout(CONSISTENCY_TIMEOUT + 1000);
        setTimeout(done, CONSISTENCY_TIMEOUT);
    });
    it("Loading", function (done) {
        this.store.load(function (err, data) {
            if (err) {
                done(err);
            }
            try {
                chai_1.assert.deepEqual(data, { param: 1 });
                done();
            }
            catch (err) {
                done(err);
            }
        });
    });
});
//# sourceMappingURL=f:/Projects/migrate-datastore-store/lib/test/test.js.map