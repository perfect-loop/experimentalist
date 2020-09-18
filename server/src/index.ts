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

// import sockets from "./sockets";
// sockets(server);
/************************************************************************************
 *                             Socket
 ***********************************************************************************/

import socket, { Socket } from "socket.io";
import { Api } from "models/Socket";
export const io = socket(server, { origins: "*:*" });
io.on("connection", (scket: any) => {
  scket.on("disconnect", (data: any) => {
    console.log("disconnecting");
  });
});

function handleEventEvent(scket: socket.Socket): (...args: any[]) => void {
  return (message: Api.Socket.ISocket) => {
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

function handleDisconnect(): (...args: any[]) => void {
  return () => {
    console.log("user disconnected");
  };
}

io.on("connection", (scket: Socket) => {
  scket.on(Api.Socket.EVENT_UPDATED_NAME, handleEventEvent(scket));
  scket.on(Api.Socket.EVENT_BROADCAST_NAME, handleBroadcastEvent(scket));
  scket.on("disconnect", handleDisconnect());
});

(async () => {
  console.log("Starting application server");
  server.listen(port);
  console.log(`Server is up @ http://localhost:${port}`);
})();

export default app;
