import React from "react";
import AuthenticatedIcons from "./AuthenticatedIcons";
import UnAuthenticatedIcons from "./UnAuthenticatedIcons";

export default function Icons(props: any) {
  return (
    <>
      <AuthenticatedIcons />
      <UnAuthenticatedIcons />
    </>
  );
}
