import { Component } from "react";
import React from "react";
import { observer } from "mobx-react";

interface IState {
  dummy: boolean;
}

@observer
export default class Index extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      dummy: false,
    };
  }

  public render() {
    return <div>Profile Code Goes Here</div>;
  }
}
