"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Participation = void 0;
var mongoose = require("mongoose");
var ParticipationsSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "events"
    },
    role: {
        type: String,
        enum: ["attendee", "host"],
        default: "attendee"
    },
    anonymousName: {
        type: String
    },
    instructions: {
        type: String
    },
    attendedAt: {
        type: Date
    }
}, {
    timestamps: true
});
ParticipationsSchema.index({ "email": 1, "event": 1, role: 1 }, { unique: true });
exports.Participation = mongoose.model("participation", ParticipationsSchema);
