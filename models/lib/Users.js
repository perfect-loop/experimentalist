"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserSchema = void 0;
/* eslint-disable */
var mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    timestamps: true,
    strict: false
});
// export default mongoose.model("users", UserSchema);
exports.User = mongoose.model("users_profiles", exports.UserSchema);
