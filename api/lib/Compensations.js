"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compensation = void 0;
var mongoose = require("mongoose");
var Participations_1 = require("./Participations");
var CompensationsSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["Unpaid", "Paid"],
        default: "Unpaid",
    },
    sender: {
        type: Participations_1.ParticipationsSchema,
    },
    receiver: {
        type: Participations_1.ParticipationsSchema,
    },
});
CompensationsSchema.index({ "sender._id": 1, "receiver._id": 1 }, { unique: true });
exports.Compensation = mongoose.model("compensation", CompensationsSchema);
