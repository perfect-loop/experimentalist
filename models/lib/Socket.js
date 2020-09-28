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
        Socket.EVENT_JOIN_EVENT_NAME = "JOIN_EVENT";
        Socket.EVENT_PARTICIPATION_UPDATE = "EVENT_PARTICIPATION_UPDATED";
        function sendBroadcast(socket, eventId, message) {
            var broadcastMessage = {
                eventId: eventId,
                message: message,
            };
            socket.emit(Api.Socket.EVENT_BROADCAST_NAME, broadcastMessage);
        }
        Socket.sendBroadcast = sendBroadcast;
        function sendEventEvent(socket, event) {
            socket.emit(Socket.EVENT_UPDATED_NAME, { event: event });
        }
        Socket.sendEventEvent = sendEventEvent;
        function joinEvent(socket, message) {
            socket.emit(Socket.EVENT_JOIN_EVENT_NAME, message);
        }
        Socket.joinEvent = joinEvent;
        function eventSocketId(event) {
            return eventSocketIdByEventId(event._id);
        }
        Socket.eventSocketId = eventSocketId;
        function eventSocketIdByEventId(eventId) {
            return "event-" + eventId;
        }
        Socket.eventSocketIdByEventId = eventSocketIdByEventId;
    })(Socket = Api.Socket || (Api.Socket = {}));
})(Api = exports.Api || (exports.Api = {}));
