import React, { Component } from "react";
import { ZoomMtg } from "@zoomus/websdk";
import $ from "jquery";

import "./index.css";
import FabView from "./FabView";

const API_KEY = "d9X8t8-HQgi33MzVsdZKcg";
const API_SECRET = "oBBj6t1iz60wXXCTkHZPNHni19qJCM5LiLdd";

enum Role {
  Attendee = 0,
  Host = 1,
  Assistant = 5,
}

interface IMeetingConfig {
  apiKey: string;
  apiSecret: string;
  meetingNumber: number;
  userName: string;
  passWord: string;
  leaveUrl: string;
  role: Role;
}

interface IState {
  role: Role;
}

class VideConference extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      role: Role.Attendee,
    };
  }

  componentDidMount() {
    console.log("mounted");
    console.log("checkSystemRequirements");
    console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));
    this.prepareConference();
  }

  render() {
    return (
      <>
        <FabView />
      </>
    );
  }

  private prepareConference = () => {
    $("#zmmtg-root").show();
    ZoomMtg.setZoomJSLib("https://source.zoom.us/1.7.7/lib", "/av");
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
    this.startConference(this.state.role);
  };

  private startConference = (role: Role) => {
    const meetConfig: IMeetingConfig = {
      apiKey: API_KEY,
      apiSecret: API_SECRET,
      meetingNumber: 7503424717,
      userName: "React User",
      passWord: "1e3AM8",
      leaveUrl: "http://localhost:9999/",
      role: role,
    };
    console.log(meetConfig);

    console.log("generting signature");
    ZoomMtg.generateSignature({
      meetingNumber: meetConfig.meetingNumber,
      apiKey: meetConfig.apiKey,
      apiSecret: meetConfig.apiSecret,
      role: meetConfig.role,
      success: (res: any) => {
        console.log("signature", res.result);
        this.initializeConference(meetConfig, res);
      },
    });
  };

  private initializeConference = (meetConfig: IMeetingConfig, res: any) => {
    ZoomMtg.init({
      leaveUrl: "http://localhost:3001/",
      success: () => {
        this.joinConference(meetConfig, res);
      },
      error(res: any) {
        console.log(res);
      },
    });
  };

  private joinConference = (meetConfig: IMeetingConfig, res: any) => {
    ZoomMtg.join({
      meetingNumber: meetConfig.meetingNumber,
      userName: meetConfig.userName,
      signature: res.result,
      apiKey: meetConfig.apiKey,
      passWord: meetConfig.passWord,
      success: () => {
        console.log("join meeting success");
        this.customizeConference();
      },
      error(res: any) {
        console.log(res);
      },
    });
  };

  private customizeConference = () => {
    if (this.state.role == Role.Attendee) {
      $(".img-start-video")
        .parents("button")
        .hide();
    }
  };
}

export default VideConference;
