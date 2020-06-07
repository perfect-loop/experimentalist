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
const DISABLED_CHAT_MSG = "You can only send messages to the host and not other recepients";
const ENABLED_CHAT_MSG = "Type your message to host";

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

interface IAttendee {
  audio: string;
  isHost: boolean;
  muted: boolean;
  participantId: number;
  userId: number;
  userName: string;
}

interface IZoomUser {
  userId: number;
  participantId: number;
  userName: string;
  muted: boolean;
  audio: string;
}

interface IAttendeeList {
  attendeesList: IAttendee[];
}

interface IZoomResult {
  result?: IAttendeeList;
  status: boolean;
  errorCode: number;
  errorMessage: string;
}

interface IState {
  role: Role;
  user?: Auth0User;
  hosts?: IAttendee[]; // list of all hosts for this meeting
  currentId?: number; // my id from zoom
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
      disableJoinAudio: true,
      screenShare: false,
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
      this.disableAudio();
    }
    this.getRoomInfo();
    this.getMyInfo();
  };

  /**
   * Removes various widgets that disallows users from controlling their audio
   */
  private disableAudio = () => {
    $(".join-audio")
      .parents(".left-tool-item")
      .hide();

    this.addCustomEventListener("#wc-container-right", "load", (event: Event) => {
      $(".participants-footer .ax-outline-blue-important").hide();
      $(".participants-me .p-mre").hide();
    });
  };

  private getMyInfo = () => {
    console.log("getMyInfo: Gathering room info");
    ZoomMtg.getCurrentUser({
      success: (res: { result: { currentUser: IZoomUser } }) => {
        let interval;
        if (!res.result) {
          console.log("getRoomInfo: No userid detected");
          // if info is not yet available, try again in 5 seconds
          interval = setInterval(this.getMyInfo, 5000);
          return;
        }
        // stop getting info
        clearInterval(interval);

        this.setState({
          ...this.state,
          currentId: res.result.currentUser.userId,
        });
        this.onCurrentUserKnown();
        console.log(`getMyInfo: State is ${JSON.stringify(this.state)}`);
      },
    });
  };

  // Make sure that current user is muted
  private onCurrentUserKnown = () => {
    ZoomMtg.mute({
      userId: this.state.currentId,
      mute: true,
    });
  };

  private getRoomInfo = () => {
    console.log("getRoomInfo: Gathering room info");
    ZoomMtg.getAttendeeslist({
      success: (res: IZoomResult) => {
        let interval;
        console.log("getRoomInfo: ", res);
        if (!res.result?.attendeesList) {
          console.log("getRoomInfo: No attendee detected");

          // if info is not yet available, try again in 5 seconds
          interval = setInterval(this.getRoomInfo, 5000);
          return;
        }

        // stop getting info
        clearInterval(interval);
        console.log("getRoomInfo: Setting new state");
        this.state = {
          ...this.state,
          hosts: res.result?.attendeesList.filter(a => a.isHost),
        };
        console.log(`getRoomInfo: State is ${JSON.stringify(this.state)}`);
      },
    });
  };

  private removeChatParticipants = () => {
    this.addCustomEventListener(".chat-container #chat-textarea", "focus", (event: Event) => {
      // cannot use .data() for some reason
      const currentRecepient = $("#receiverListDropDownOpen").attr("data-userid");
      if (currentRecepient) {
        const present = this.state.hosts?.find(attendee => {
          return attendee.userId.toString() === currentRecepient.toString();
        });
        if (!present) {
          console.log("removeChatParticipants: Disabling chat");
          $("#chat-textarea")
            .attr("readonly", "true")
            .attr("placeholder", DISABLED_CHAT_MSG);
        } else {
          console.log("removeChatParticipants: Enabling chat");
          $("#chat-textarea")
            .removeAttr("readonly")
            .attr("placeholder", ENABLED_CHAT_MSG);
        }
      }
    });
  };

  private customizeConference = () => {
    console.log("Customizing Room");
    if (this.state.role === Role.Attendee) {
      this.renamePaticipants();
      this.removeChatParticipants();
    }
    this.getRoomInfo();
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
