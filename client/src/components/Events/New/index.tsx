import React from "react"
import { Button, makeStyles, Theme, createStyles, TextField } from "@material-ui/core";
import { useAuth0 } from "../../../util/react-auth0-spa";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }),
);

const New = () => {
  const auth0 = useAuth0();
  const isAuthenticated = auth0.isAuthenticated;
  const classes = useStyles();

  return (
    <div>
      {isAuthenticated && (
        <>
          <form className={classes.root} noValidate autoComplete="off">
            <div>
              <TextField required id="standard-required" label="Required" defaultValue="Hello World" />
            </div>
            <div>
              <Button variant="contained">Create</Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};


export default New;