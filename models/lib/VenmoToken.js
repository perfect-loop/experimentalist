"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenmoToken = exports.VenmoTokenSchema = void 0;
var mongoose = require("mongoose");
exports.VenmoTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});
exports.VenmoToken = mongoose.model("venmo_tokens", exports.VenmoTokenSchema);
