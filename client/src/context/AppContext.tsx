import React, { useContext } from "react";
import io from "socket.io-client";
import { SOCKET_SERVER_URL } from "../util/config";

const socket = io(SOCKET_SERVER_URL, {
  transports: ["websocket"],
  upgrade: false,
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  pingInterval: 25000, // default - 25000
  pingTimeout: 60000, // default - 60000
});
export const AppContext = React.createContext({
  socket,
});
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const useAppContext = () => useContext(AppContext)!;
