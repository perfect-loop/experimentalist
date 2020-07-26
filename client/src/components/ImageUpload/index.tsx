import React from "react";
import ImageUploadStore from "./store/ImageUploadStore";
import Instructions from "./Instructions";
import { observer } from "mobx-react";
import { Redirect } from "react-router-dom";

interface IProps {
  participationId: string;
  eventId: string;
}

interface IState {
  store: ImageUploadStore;
}

interface ICloudinaryInfo {
  asset_id: string;
  batch_id: string;
  path: string;
  secure_url: string;
  tags: string[];
  url: string;
  thumbnail_url: string;
}

interface ICloudinaryResponse {
  event: "queues-end" | "queues-start" | "display-changed" | "success" | "close";
  info: ICloudinaryInfo;
}

@observer
export default class ImageUpload extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      store: new ImageUploadStore(props.participationId),
    };
  }
  uploadWidget() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    cloudinary.openUploadWidget(
      {
        // eslint-disable-next-line @typescript-eslint/camelcase
        cloud_name: process.env.REACT_APP_CLOUDINARY_NAME,
        // eslint-disable-next-line @typescript-eslint/camelcase
        upload_preset: process.env.REACT_APP_CLOUDINARY_PRESET,
        tags: ["verify"],
        sources: ["camera"],
        showAdvancedOptions: true,
      },
      (e: any, result: ICloudinaryResponse) => {
        if (result.event === "success") {
          console.log("Image uploaded successfully");
          this.state.store.update(result.info.secure_url);
        }
        if (result.event === "close") {
          console.log("Closed dialog");
          this.state.store.complete();
        }
      },
    );
  }
  render(): JSX.Element {
    switch (this.state.store.state.kind) {
      case "not_started":
      case "uploading":
      case "success_upload":
        return <Instructions uploadWidget={this.uploadWidget.bind(this)} />;
      case "finish":
        return <Redirect to={`/events/${this.props.eventId}/conference/`} />;
    }
  }
}
