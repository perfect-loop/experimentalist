"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PARTICIPANT_SUFFIX = exports.Role = void 0;
var Role;
(function (Role) {
    Role[Role["Attendee"] = 0] = "Attendee";
    Role[Role["Host"] = 1] = "Host";
    Role[Role["Assistant"] = 5] = "Assistant";
})(Role = exports.Role || (exports.Role = {}));
exports.PARTICIPANT_SUFFIX = "(P)";
