import React from "react";
import { Form, Field } from "react-final-form";
import TextFieldAdapter from "../../Forms/TextFieldAdapter";
import VenmoStorage from "./storage/VenmoStorage";
import {
  Button,
  Typography,
  makeStyles,
  Theme,
  createStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import { Alert, AlertTitle } from "@material-ui/lab";
import Badge from '@material-ui/core/Badge';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

interface IVenmoCode {
  code: number;
}

function selectPaymentMethod(venmoStorage: VenmoStorage, id: string) {
  console.log("Selected id", id);
  venmoStorage.selectMethod(id);
}

const Methods = (props: { venmoStorage: VenmoStorage }) => {
  const classes = useStyles();
  const onSubmit = (values: IVenmoCode) => {
    console.log(values.code);
    props.venmoStorage.verifyMFA(values.code);
  };
  if (props.venmoStorage.state.kind === "methods") {
    const methods = props.venmoStorage.state.methods;

    return (
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <>
            <Typography variant="body1" color="textPrimary" component="p">
              Select payment method to use as backup
            </Typography>
            <div className={classes.root}>
              <List component="nav" aria-label="main mailbox folders">
                {methods.map(method => {
                  return (
                    <ListItem button onClick={() => selectPaymentMethod(props.venmoStorage, method.id)}>
                      <ListItemIcon>
                        <img src={method.assets?.thumbnail} width="40" height="24" />
                      </ListItemIcon>
                      {method.last_four &&
                        <ListItemText primary={`${method.name} x${method.last_four}`} />
                      }
                      {!method.last_four &&
                        <ListItemText primary={`${method.name}`} />
                      }
                      {method.fee &&
                        <Badge badgeContent={<MonetizationOnOutlinedIcon />} color="primary" />
                      }
                    </ListItem>
                  );
                })}
              </List>
            </div>

            <Alert severity="info">
              <AlertTitle>Note</AlertTitle>
              Note: Venmo will use your Venmo balance to pay. If you go over your limit alternative payment method will
              be used to cover the difference.
            </Alert>
          </>
        )}
      />
    );
  } else {
    return <></>;
  }
};

export default Methods;
