import React from "react";
import { IEvent } from "api/Events";

export default function EventStatus(props: { event: IEvent }): JSX.Element {
  switch (props.event.state) {
    case "locked":
      return <>Full</>;
    case "started":
    case "active":
      return <>Started</>;
    case "not_started":
      return <>Not Started</>;
    case "ended":
      return <>Ended</>;
  }
}
