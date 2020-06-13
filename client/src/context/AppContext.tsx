import React, { useContext } from "react";
import socketIOClient from "socket.io-client";
import { SOCKET_SERVER_URL } from "../util/config";

const socket = socketIOClient(SOCKET_SERVER_URL);
export const AppContext = React.createContext({
  socket,
});
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const useAppContext = () => useContext(AppContext)!;
