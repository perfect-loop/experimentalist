import React, { Component } from "react";
import { observer } from "mobx-react";
import CompensationStore from "../storage/CompensationStore";

@observer
class Index extends Component<{}, {}> {
  constructor(props: {}) {
    super(props);
    const compensationStore = new CompensationStore();
    compensationStore.get();
  }

  public render() {
    return (
    <div>testing</div>)
  }
}

export default Index; 