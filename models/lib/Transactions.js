"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
var mongoose = require("mongoose");
var TransactionsSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    transactionId: {
        type: String,
        required: true
    },
    method: {
        type: String,
        required: true
    },
    compensation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "compensation",
        required: true
    }
});
exports.Transaction = mongoose.model("transaction", TransactionsSchema);
