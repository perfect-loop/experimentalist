"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = exports.ProfileSchema = void 0;
var mongoose = require("mongoose");
var STATES = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL",
    "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI",
    "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH",
    "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV",
    "WI", "WY"];
exports.ProfileSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        require: true
    },
    venmoId: {
        type: String,
        require: true
    },
    studentId: {
        type: Number,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    street: {
        type: String,
        require: true
    },
    state: {
        type: String,
        enum: STATES,
    },
    zip: {
        type: Number,
        require: true
    },
}, {
    timestamps: true
});
exports.Profile = mongoose.model("profiles", exports.ProfileSchema);
