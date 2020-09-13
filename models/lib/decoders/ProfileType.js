"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileType = void 0;
var t = require("io-ts");
exports.ProfileType = t.type({
    _id: t.string,
    firstName: t.string,
    lastName: t.string,
    venmoId: t.string,
    venmoHandle: t.string,
});
