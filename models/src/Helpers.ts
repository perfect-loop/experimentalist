import { IEvent } from "./Events";

export const isStarted = function (event: IEvent) {
  return event.state !== "not_started";
};

export const isLocked = function(event: IEvent) {
  // this is a workaround for not having a state machine
  return event.state === "locked" || event.state === "ended";
}

export const isEnded = function(event: IEvent) {
  // this is a workaround for not having a state machine
  return event.state === "ended";
}