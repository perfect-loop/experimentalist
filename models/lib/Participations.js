"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Participation = exports.ParticipationsSchema = void 0;
var mongoose = require("mongoose");
exports.ParticipationsSchema = new mongoose.Schema({
    email: {
        type: String
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "events"
    },
    role: {
        type: String,
        enum: ["attendee", "host", "assistant"],
        default: "attendee"
    },
    anonymousName: {
        type: String,
        unique: true
    },
    instructions: {
        type: String
    },
    attendedAt: {
        type: Date
    },
    admittedAt: {
        type: Date
    },
    verificationImageUrl: {
        type: String
    }
}, {
    timestamps: true
});
exports.ParticipationsSchema.index({ email: 1, event: 1, role: 1 }, { unique: true });
exports.ParticipationsSchema.index({ anonymousName: 1 }, { unique: true });
// ParticipationsSchema.pre("save", function (next: any) {
//   // @ts-ignore
//   this.anonymousName = Math.trunc(Math.random() * 1000000).toString();
//   next();
// });
exports.ParticipationsSchema.path("verificationImageUrl").validate(function (value) {
    return value.match(/https?:\/\/.*/);
}, "Image must be valid url");
exports.Participation = mongoose.model("participation", exports.ParticipationsSchema);
