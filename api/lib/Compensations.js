"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compensation = void 0;
var mongoose = require("mongoose");
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
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "participation",
        require: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "participation",
        require: true,
    },
});
CompensationsSchema.index({ senderId: 1, receiverId: 1 }, { unique: true });
exports.Compensation = mongoose.model("compensation", CompensationsSchema);
