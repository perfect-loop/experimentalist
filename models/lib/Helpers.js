"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACCEPTED_CURRENCIES = exports.isEnded = exports.isLocked = exports.isStarted = void 0;
exports.isStarted = function (event) {
    return event.state !== "not_started";
};
exports.isLocked = function (event) {
    // this is a workaround for not having a state machine
    return event.state === "locked" || event.state === "ended";
};
exports.isEnded = function (event) {
    // this is a workaround for not having a state machine
    return event.state === "ended";
};
exports.ACCEPTED_CURRENCIES = ["USD", "CAD", "AUD", "EUR"];
