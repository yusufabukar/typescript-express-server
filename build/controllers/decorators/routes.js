"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = exports.patch = exports.put = exports.post = exports.get = void 0;
require("reflect-metadata");
var MetadataKeys_1 = require("./MetadataKeys");
var Methods_1 = require("./Methods");
function routeBinder(method) {
    return function (path) {
        return function (target, key, desc) {
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.PATH, path, target, key);
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.METHOD, method, target, key);
        };
    };
}
;
exports.get = routeBinder(Methods_1.Methods.GET);
exports.post = routeBinder(Methods_1.Methods.POST);
exports.put = routeBinder(Methods_1.Methods.PUT);
exports.patch = routeBinder(Methods_1.Methods.PATCH);
exports.del = routeBinder(Methods_1.Methods.DEL);
