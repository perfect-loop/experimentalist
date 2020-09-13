import React from "react";
import { Dialog, DialogContent, DialogActions, Button } from "@material-ui/core";
import { DialogTitleWithClose } from "../../Forms/DialogTitleWithClose";
import { IParticipation } from "models/Participations";
import { EventSettingsStore } from "../../EventSettings/store/EventSettingsStore";
import { IEventSettings } from "models/EventSettings";
import { observer } from "mobx-react";

function IntroductionView(props: { participant: IParticipation; eventSettingsStore: EventSettingsStore }): JSX.Element {
  const [open, setOpen] = React.useState(true);
  const onClose = () => {
    setOpen(false);
  };

  const onClick = () => {
    setOpen(false);
  };

  if (props.participant.role !== "host") {
    switch (props.eventSettingsStore.state.kind) {
      case "empty": {
        return <></>;
      }
      case "not_ready": {
        return <></>;
      }
      case "ready": {
        const settings: IEventSettings = props.eventSettingsStore.state.data;
        if (!settings || !settings.introVideo) {
          return <></>;
        }
        return (
          <Dialog aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitleWithClose id="welcome-dialog" onClose={onClose}>
              {props.participant.event.title}
            </DialogTitleWithClose>
            <DialogContent dividers>
              {settings.introVideo && (
                <iframe
                  src={settings.introVideo}
                  title="Introductory Video"
                  width="480"
                  height="270"
                  allow="autoplay"
                ></iframe>
              )}
            </DialogContent>
            <DialogActions>
              <Button autoFocus color="primary" onClick={onClick}>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        );
      }
    }
  } else {
    return <></>;
  }
}

export default observer(IntroductionView);
