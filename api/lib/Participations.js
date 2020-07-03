"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Participation = exports.ParticipationsSchema = void 0;
var mongoose = require("mongoose");
var Events_1 = require("./Events");
exports.ParticipationsSchema = new mongoose.Schema({
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
exports.ParticipationsSchema.index({ "email": 1, "event._id": 1, role: 1 }, { unique: true });
exports.Participation = mongoose.model("participation", exports.ParticipationsSchema);
