import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { CardActionArea, CardMedia } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 870,
  },
  media: {
    height: 340,
  },
});

export default function Instructions(props: { uploadWidget: () => any }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image="/conference/verify.png" title="Contemplative Reptile" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Verify your Identity
          </Typography>
          <Typography variant="body1" color="textPrimary" component="p">
            Please validate your identity by taking a selfie next to your student id
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          onClick={props.uploadWidget}
          variant="contained"
          color="primary"
          size="medium"
          startIcon={<PhotoCameraIcon />}
        >
          Take photo
        </Button>
      </CardActions>
    </Card>
  );
}
