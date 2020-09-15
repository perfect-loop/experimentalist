"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSettingsType = void 0;
var t = require("io-ts");
exports.EventSettingsType = t.type({
    _id: t.string,
    introVideo: t.string,
});
