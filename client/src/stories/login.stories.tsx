import React from "react";
import { Api } from "../util/api";
import { Button } from "@material-ui/core";

export default {
  title: "Mock Login",
};

function onSubmit() {
  const api = new Api({ baseURL: "http://localhost:3000" });
  const body = {
    username: "ilyakatz@gmail.com",
    password: "none",
  };
  api.post("/api/auth/mock", body);
}

export const MockLogin = () => {
  return (
    <div>
      <Button onClick={onSubmit}>Login</Button>
    </div>
  );
};
