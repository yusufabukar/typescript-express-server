"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
require("reflect-metadata");
var AppRouter_1 = __importDefault(require("../../AppRouter"));
var MetadataKeys_1 = require("./MetadataKeys");
function controller(routePrefix) {
    return function (target) {
        var router = AppRouter_1.default.getInstance();
        for (var key in target.prototype) {
            var routeHandler = target.prototype[key];
            var path = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.PATH, target.prototype, key);
            var method = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.METHOD, target.prototype, key);
            if (path) {
                router[method]("" + routePrefix + path, routeHandler);
            }
            ;
        }
        ;
    };
}
exports.controller = controller;
;
