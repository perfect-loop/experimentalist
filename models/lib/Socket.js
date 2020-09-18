"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
var Api;
(function (Api) {
    var Socket;
    (function (Socket) {
        Socket.EVENT_UPDATED_NAME = "EVENT_UPDATED";
        Socket.EVENT_ADMIT_PARTICIPANT = "EVENT_ADMIN_PARTICIPANT";
        Socket.EVENT_BROADCAST_NAME = "BROADCAST";
        function sendBroadcast(socket, eventId, message) {
            var broadcastMessage = {
                eventId: eventId, message: message
            };
            socket.emit(Api.Socket.EVENT_BROADCAST_NAME, broadcastMessage);
        }
        Socket.sendBroadcast = sendBroadcast;
        function sendEventEvent(socket, event) {
            socket.emit(Socket.EVENT_UPDATED_NAME, { event: event });
        }
        Socket.sendEventEvent = sendEventEvent;
    })(Socket = Api.Socket || (Api.Socket = {}));
})(Api = exports.Api || (exports.Api = {}));
