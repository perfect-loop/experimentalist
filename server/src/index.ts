import "./LoadEnv"; // Must be the first import

import morgan from "morgan";
import path from "path";
import rfs from "rotating-file-stream";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import debugLib from "debug";
import http from "http";
import { ApplicationError } from "./types";
import { normalizePort } from "./util";
import { SERVER_ROOT } from "./constants";

const debug = debugLib("server");

const accessLogStream = rfs("access.log", {
  interval: "1d", // rotate daily
  path: path.join(SERVER_ROOT, "log")
});

// const app = express();
import app from "./Server";

// Apache commons style logging
app.use(morgan("combined", { stream: accessLogStream }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(SERVER_ROOT, "public")));

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   const err: ApplicationError = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

export const server = http.createServer(app);

server.on("error", (error: ApplicationError) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on("listening", () => {
  const addr = server.address();
  if (addr) {
    const bind =
      typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    debug("Listening on " + bind);
  } else {
    debug("Unable to create address");
  }
});

/************************************************************************************
 *                             Socket
 ***********************************************************************************/

import socket, { Socket } from "socket.io";
import { Api } from "models/Socket";
import logger from "./shared/Logger";
import { IEvent } from "models/Events";
export const io = socket(server, { origins: "*:*" });

function handleEventEvent(scket: socket.Socket): (...args: any[]) => void {
  return (message: IEvent) => {
    console.log(`[handleEventEvent] ${JSON.stringify(message)}`);
    scket.broadcast.emit(Api.Socket.EVENT_UPDATED_NAME, message);
  };
}

function handleBroadcastEvent(scket: socket.Socket): (...args: any[]) => void {
  return (message: Api.Socket.IBroadcastMessage) => {
    console.log(`[handleBroadcastEvent] ${JSON.stringify(message)}`);
    scket.broadcast.emit(Api.Socket.EVENT_BROADCAST_NAME, message);
  };
}

function handleJoinRoomEvent(scket: socket.Socket): (...args: any[]) => void {
  return (message: Api.Socket.IJoinEventMessage) => {
    const roomName = message.roomName;
    joinRoom(roomName);
  };

  function joinRoom(roomName: string) {
    scket.join(roomName);
    logger.info(`[handleJoinRoomEvent] ${JSON.stringify(roomName)}`);
    const clients = io.sockets.adapter.rooms[roomName];
    if (clients.length && clients.length > 0) {
      logger.info(
        `[handleJoinRoomEvent] number of clients in ${roomName} is ${clients.length}`
      );
    } else {
      logger.error(
        `[handleJoinRoomEvent] noone joined ${roomName} but expecting at least one`
      );
    }
  }
}

function handleDisconnect(): (...args: any[]) => void {
  return () => {
    console.log("user disconnected");
  };
}

io.on("connection", (scket: Socket) => {
  logger.info("User connected to socket");
  scket.join("Experimentalist");
  scket.on(Api.Socket.EVENT_UPDATED_NAME, handleEventEvent(scket));
  scket.on(Api.Socket.EVENT_BROADCAST_NAME, handleBroadcastEvent(scket));
  scket.on(Api.Socket.EVENT_JOIN_EVENT_NAME, handleJoinRoomEvent(scket));
  scket.on("disconnect", handleDisconnect());
});

(async () => {
  console.log("Starting application server");
  server.listen(port);
  console.log(`Server is up @ http://localhost:${port}`);
})();

export default app;
