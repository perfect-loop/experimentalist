import React, { Component } from "react";
import { ZoomMtg } from "@zoomus/websdk";
import $ from "jquery";

import "./index.css";
import FabView from "./FabView";
import { Auth0User } from "../../util/react-auth0-spa";
import randomWords from "random-words";
import { SERVER_URL } from "../../util/config";

const API_KEY = "d9X8t8-HQgi33MzVsdZKcg";
const API_SECRET = "oBBj6t1iz60wXXCTkHZPNHni19qJCM5LiLdd";

export enum Role {
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
  user?: Auth0User;
}

interface IProps {
  role: Role;
  user?: Auth0User;
}

class VideConference extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      role: props.role || Role.Attendee,
      user: props.user,
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
    ZoomMtg.setZoomJSLib("https://source.zoom.us/1.7.8/lib", "/av");
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
    this.startConference(this.state.role);
    this.customizeConference();
  };

  private startConference = (role: Role) => {
    const meetConfig: IMeetingConfig = {
      apiKey: API_KEY,
      apiSecret: API_SECRET,
      meetingNumber: 7503424717,
      userName: this.participantName(),
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
      loginWindow: {
        // optional,
        width: 400,
        height: 380,
      },
      leaveUrl: SERVER_URL,
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
        this.customizeOnJoin();
      },
      error(res: any) {
        console.log(res);
      },
    });
  };

  private randomName() {
    return randomWords({
      exactly: 1,
      wordsPerString: 2,
      separator: " ",
    });
  }

  private participantName = () => {
    return this.state.role == Role.Host ? "PI" : `${this.randomName()} [${this.state.user?.email}]`;
  };

  private customizeOnJoin = () => {
    if (this.state.role == Role.Attendee) {
      $(".img-start-video")
        .parents("button")
        .hide();
    }
  };

  private customizeConference = () => {
    if (this.state.role === Role.Attendee) {
      this.renamePaticipants();
    }
  };

  private renamePaticipants = () => {
    this.addCustomEventListener(".participants-li", "load", (event: Event) => {
      const $participant = $(event.target)
        .parents(".participants-li")
        .find("[title]");
      const currentName = $participant.text();
      const newName = currentName.replace(/\[.*\]/, ``);
      $participant.text(newName);
    });
  };

  private addCustomEventListener = (selector: any, event: any, handler: any) => {
    const rootElement = document.querySelector("body");
    //since the root element is set to be body for our current dealings
    if (rootElement) {
      rootElement.addEventListener(
        event,
        function(evt) {
          let targetElement = evt.target;
          while (targetElement != null) {
            if (targetElement.matches(selector)) {
              handler(evt);
              return;
            }
            targetElement = targetElement.parentElement;
          }
        },
        true,
      );
    }
  };
}

export default VideConference;

// ZoomMtg.getAttendeeslist({
//   success: function (res) {
//     console.log(res, "get getAttendeeslist");
//   }
// });
// To be available in version 1.8
