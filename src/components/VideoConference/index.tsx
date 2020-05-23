import React, { Component } from "react";
import { ZoomMtg } from "@zoomus/websdk";
import $ from "jquery";

const API_KEY = "d9X8t8-HQgi33MzVsdZKcg";
const API_SECRET = "oBBj6t1iz60wXXCTkHZPNHni19qJCM5LiLdd";

enum Role {
  Attendee = 0,
  Host = 1,
  Assistant = 5,
}

class VideConference extends Component<{}> {
  componentDidMount() {
    $("h1");
    console.log("mounted");
    console.log("checkSystemRequirements");
    console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));
    ZoomMtg.setZoomJSLib("https://source.zoom.us/1.7.7/lib", "/av");
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
    this.startConference(Role.Attendee);
  }

  render() {
    return <div>Video</div>;
  }

  startConference(role: Role) {
    const meetConfig = {
      apiKey: API_KEY,
      apiSecret: API_SECRET,
      meetingNumber: 7503424717,
      userName: "React User",
      passWord: "1e3AM8",
      leaveUrl: "http://localhost:9999/",
      role: role,
    };
    console.log(meetConfig);

    ZoomMtg.generateSignature({
      meetingNumber: meetConfig.meetingNumber,
      apiKey: meetConfig.apiKey,
      apiSecret: meetConfig.apiSecret,
      role: meetConfig.role,
      success(res: any) {
        console.log("signature", res.result);
        ZoomMtg.init({
          leaveUrl: "http://www.zoom.us",
          success() {
            ZoomMtg.join({
              meetingNumber: meetConfig.meetingNumber,
              userName: meetConfig.userName,
              signature: res.result,
              apiKey: meetConfig.apiKey,
              passWord: meetConfig.passWord,
              success() {
                $("#nav-tool").hide();
                console.log("join meeting success");
              },
              error(res: any) {
                console.log(res);
              },
            });
          },
          error(res: any) {
            console.log(res);
          },
        });
      },
    });
  }
}

export default VideConference;
