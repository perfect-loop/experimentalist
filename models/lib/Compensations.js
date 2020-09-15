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
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "participation",
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "participation",
        require: true,
    },
    paymentMethod: {
        type: String,
        enum: ["venmo", "paypal"],
    }
});
CompensationsSchema.index({ sender: 1, receiver: 1 }, { unique: true });
exports.Compensation = mongoose.model("compensation", CompensationsSchema);
