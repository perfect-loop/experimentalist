"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSettings = exports.EventSettingsSchema = void 0;
var mongoose = require("mongoose");
exports.EventSettingsSchema = new mongoose.Schema({
    introVideo: {
        type: String
    },
    requireId: {
        type: Boolean,
        default: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "events"
    },
    paymentMethod: {
        type: String,
        enum: ["venmo", "paypal", "none"],
        default: "venmo"
    },
    intelligentReadmit: {
        type: Boolean,
        default: false
    },
    showInstructions: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});
exports.EventSettings = mongoose.model("event_settings", exports.EventSettingsSchema);
