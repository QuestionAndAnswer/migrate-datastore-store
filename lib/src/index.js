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
var datastore_1 = require("@google-cloud/datastore");
exports.DEFAULT_DATASTORE_STORE_KIND = "_MIGRATIONS_STATE_";
var DatastoreStore = (function () {
    function DatastoreStore(db, kind) {
        if (kind === void 0) { kind = exports.DEFAULT_DATASTORE_STORE_KIND; }
        this.db = db;
        this.kind = kind;
    }
    DatastoreStore.prototype.load = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var state, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.getLastState()];
                    case 1:
                        state = _a.sent();
                        callback(null, state || {});
                        return [3, 3];
                    case 2:
                        err_1 = _a.sent();
                        callback(err_1, null);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    DatastoreStore.prototype.save = function (set, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var state, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, this.getLastState()];
                    case 1:
                        state = _a.sent();
                        return [4, this.db.save({
                                key: state ? state[datastore_1.KEY] : this.db.key([this.kind]),
                                data: JSON.parse(JSON.stringify({
                                    lastRun: set.lastRun,
                                    migrations: set.migrations
                                }))
                            })];
                    case 2:
                        _a.sent();
                        callback(null);
                        return [3, 4];
                    case 3:
                        err_2 = _a.sent();
                        callback(err_2);
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    DatastoreStore.prototype.getLastState = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, result;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4, this.db.createQuery(this.kind)
                            .run()];
                    case 1:
                        _a = __read.apply(void 0, [_c.sent(), 1]), _b = __read(_a[0], 1), result = _b[0];
                        return [2, result];
                }
            });
        });
    };
    return DatastoreStore;
}());
exports.DatastoreStore = DatastoreStore;
exports.default = DatastoreStore;
//# sourceMappingURL=f:/Projects/migrate-datastore-store/lib/src/index.js.map