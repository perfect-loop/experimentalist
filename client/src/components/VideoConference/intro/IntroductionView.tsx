import React from "react";
import { observer } from "mobx-react";
import { Dialog, DialogContent, DialogActions, Button } from "@material-ui/core";
import { DialogTitleWithClose } from "../../Forms/DialogTitleWithClose";
import { IParticipation } from "models/Participations";
import { IEventSettings } from "models/EventSettings";

function IntroductionView(props: { participant: IParticipation; eventSettings: IEventSettings }): JSX.Element {
  const [open, setOpen] = React.useState(true);
  const onClose = () => {
    setOpen(false);
  };

  const onClick = () => {
    setOpen(false);
  };

  if (props.participant.role !== "host") {
    if (!props.eventSettings || !props.eventSettings.introVideo) {
      return <></>;
    }

    return (
      <Dialog aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitleWithClose id="welcome-dialog" onClose={onClose}>
          {props.participant.event.title}
        </DialogTitleWithClose>
        <DialogContent dividers>
          {props.eventSettings.introVideo && (
            <iframe
              src={props.eventSettings.introVideo}
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
  } else {
    return <></>;
  }
}

export default observer(IntroductionView);
