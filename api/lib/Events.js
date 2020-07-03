"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = exports.EventSchema = void 0;
var mongoose = require("mongoose");
var Helpers_1 = require("./Helpers");
exports.EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    startAt: {
        type: Date,
        require: true
    },
    instructions: {
        type: String,
    },
    endAt: Date,
    active: Boolean,
    state: {
        type: String,
        enum: ["not_started", "started", "active", "locked", "ended"],
        default: "not_started"
    }
}, {
    timestamps: true
});
exports.EventSchema.methods.isLocked = function () {
    return Helpers_1.isLocked(this);
};
exports.EventSchema.methods.isStarted = function () {
    return Helpers_1.isStarted(this);
};
exports.Event = mongoose.model("events", exports.EventSchema);
