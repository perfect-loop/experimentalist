"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
var mongoose = require("mongoose");
var EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    startAt: {
        type: Date,
        require: true
    },
    endAt: Date,
    active: Boolean
}, {
    timestamps: true
});
exports.Event = mongoose.model("events", EventSchema);
