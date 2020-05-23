import ResponseService from "./service/response_service";
import HumorResponse from "models/humor_response";
import { server } from "./index";
import socket, { Socket } from "socket.io";
import {
  SUGGESTION_TOPIC_NAME,
  MESSAGE_TOPIC_NAME,
  BROADCAST_TOPIC_NAME,
  SUGGESTED_IMAGE_TOPIC_NAME,
  Response,
  ImageResponse,
  IMAGE_BROADCAST_TOPIC_NAME,
} from "humor-api";

/* tslint:disable max-func-body-length*/
export function Messenging() {
  const io = socket(server);
  // let io = require("socket.io")(server);
  // whenever a user connects on port 3000 via
  // a websocket, log that a user has connected
  function handleDisconnect(): (...args: any[]) => void {
    return () => {
      console.log("user disconnected");
    };
  }

  function handleImageSuggestion(scket: socket.Socket): (...args: any[]) => void {
    return (response: ImageResponse) => {
      console.log(`[handleImageSuggestion] ${JSON.stringify(response)}`);
      scket.broadcast.emit(IMAGE_BROADCAST_TOPIC_NAME, response);
    };
  }

  function sendImageSuggestions(message: string, scket: Socket) {
    new ResponseService()
      .process(message)
      .then((response: HumorResponse) => {
        if (response) {
          console.log("I'm inside a promise!");
          scket.broadcast.emit(SUGGESTION_TOPIC_NAME, response);
        }
      })
      .catch((error: string) => {
        console.log(`Promise failed with ${error}`);
      });
  }

  function handleIncoming(scket: socket.Socket): (...args: any[]) => void {
    return (message: string) => {
      console.log(`[handleIncoming] ${message}`);
      console.log(message);
      // send message to all other participants
      const response: Response = {
        message,
      };
      scket.broadcast.emit(BROADCAST_TOPIC_NAME, response);
      sendImageSuggestions(message, scket);
    };
  }

  io.on("connection", (scket: Socket) => {
    scket.on(MESSAGE_TOPIC_NAME, handleIncoming(scket));
    scket.on("disconnect", handleDisconnect());
    scket.on(SUGGESTED_IMAGE_TOPIC_NAME, handleImageSuggestion(scket));
  });
}
/* tslint:enable max-func-body-length*/
