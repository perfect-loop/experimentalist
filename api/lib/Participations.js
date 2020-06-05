"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Participation = void 0;
var mongoose = require("mongoose");
var Events_1 = require("./Events");
var ParticipationsSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    event: {
        type: Events_1.EventSchema,
    },
    role: {
        type: String,
        enum: ["attendee", "host"],
        default: "attendee"
    }
}, {
    timestamps: true
});
ParticipationsSchema.index({ "email": 1, "event._id": 1, role: 1 }, { unique: true });
exports.Participation = mongoose.model("participation", ParticipationsSchema);
