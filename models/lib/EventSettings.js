"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSettings = exports.EventSettingsSchema = void 0;
var mongoose = require("mongoose");
exports.EventSettingsSchema = new mongoose.Schema({
    introVideo: {
        type: String,
        required: true
    },
    requireId: {
        type: Boolean,
        default: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "events"
    }
}, {
    timestamps: true
});
exports.EventSettings = mongoose.model("event_settings", exports.EventSettingsSchema);
