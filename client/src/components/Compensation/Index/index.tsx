import React from "react";
import { Redirect } from "react-router-dom";

const Index = (props: { eventId: string }) => <Redirect to={`/events/${props.eventId}/host/compensations/venmo`} />;

export default Index;
