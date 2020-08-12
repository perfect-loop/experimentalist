import React from "react";
import Alert from "@material-ui/lab/Alert";
import FileUploadStore from "./store/FileUploadStore";

interface Props {
  store: FileUploadStore;
}

const FileUploadError: React.SFC<Props> = ({ store }) => {
  switch (store.state.kind) {
    case "error":
      return (
        <Alert severity="error" onClose={store.notStarted}>
          {store.state.message}
        </Alert>
      );

    case "not_started":
      return <div />;
  }
};
export default FileUploadError;
