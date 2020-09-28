"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipationSocket = exports.ParticipationSocketSchema = void 0;
var mongoose = require("mongoose");
exports.ParticipationSocketSchema = new mongoose.Schema({
    socketId: {
        type: String,
    },
    participationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "participation_sockets",
    },
}, {
    timestamps: true,
});
exports.ParticipationSocketSchema.index({ socketId: 1, participation: 1 }, { unique: true });
exports.ParticipationSocket = mongoose.model("participation_socket", exports.ParticipationSocketSchema);
