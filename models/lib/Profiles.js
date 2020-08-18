"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = exports.ProfileSchema = void 0;
var mongoose = require("mongoose");
// const STATES = [
//   "AL",
//   "AK",
//   "AZ",
//   "AR",
//   "CA",
//   "CO",
//   "CT",
//   "DE",
//   "DC",
//   "FL",
//   "GA",
//   "HI",
//   "ID",
//   "IL",
//   "IN",
//   "IA",
//   "KS",
//   "KY",
//   "LA",
//   "ME",
//   "MD",
//   "MA",
//   "MI",
//   "MN",
//   "MS",
//   "MO",
//   "MT",
//   "NE",
//   "NV",
//   "NH",
//   "NJ",
//   "NM",
//   "NY",
//   "NC",
//   "ND",
//   "OH",
//   "OK",
//   "OR",
//   "PA",
//   "RI",
//   "SC",
//   "SD",
//   "TN",
//   "TX",
//   "UT",
//   "VT",
//   "VA",
//   "WA",
//   "WV",
//   "WI",
//   "WY",
// ];
exports.ProfileSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    venmoId: {
        type: String,
        require: true,
    },
    studentId: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    street: {
        type: String,
        require: true,
    },
    state: {
        type: String,
        require: true,
    },
    zip: {
        type: String,
        require: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users_profiles",
        require: true,
        index: { unique: true },
    },
}, {
    timestamps: true,
});
exports.ProfileSchema.path("venmoId").validate(function (value) {
    return (value.match(/www.venmo.com\/.*/));
}, "must be of the form www.venmo.com/Your-Id. Login to https://venmo.com/account/settings/profile to check your id.");
exports.Profile = mongoose.model("profiles", exports.ProfileSchema);