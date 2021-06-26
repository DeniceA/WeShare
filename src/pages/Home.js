import React from "react";
import Nav from "../components/Nav";
import {
  Grid,
  makeStyles,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton,
  CardHeader,
  Avatar
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FavoriteIcon from "@material-ui/icons/Favorite";
var useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 50,
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center"
  },
  container: {
    width: 1000
  },

  media: {
    height: 0,
    paddingTop: "100%" // 16:9
  },
  friendsList: {
    height: 400,
    width: 300,
    position: "fixed"
  },
  friends: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: theme.spacing(1)
  },
  card: {
    border: "0.5px solid rgb(215, 40, 126)"
  }
}));
function Home() {
  const classes = useStyles();
  return (
    <div>
      <Nav />
      <div className={classes.root}>
        <Grid container spacing={2} className={classes.container}>
          <Grid item xs={8}>
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar src="https://scontent.fcrk1-3.fna.fbcdn.net/v/t1.6435-9/162384487_4020543097996574_4337182998067131726_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=174925&_nc_eui2=AeHEbegMwVzNnSyzvvPquh_9scju97htVt2xyO73uG1W3YN0GcXDIaKLcO5C3FwsjXUUqaBVU1gHx8_uorN7x5W6&_nc_ohc=07Rx1zihySsAX-N9zJr&_nc_ht=scontent.fcrk1-3.fna&oh=a035ecc4f66e7397cc8267c7daebd14f&oe=60DAC026" />
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title="Denice Ann Dela Cruz"
                subheader="June 26, 2021"
              />
              <CardMedia
                square
                className={classes.media}
                image="https://firebasestorage.googleapis.com/v0/b/weshare-8c94c.appspot.com/o/jeison-higuita-KD9AsSBYz3Q-unsplash%20(1).jpg?alt=media&token=30c1c29a-0cf4-4a50-9b1f-832ae9a8ccf9"
              />
              <CardActions>
                <IconButton>
                  <FavoriteIcon />
                </IconButton>
              </CardActions>
              <CardContent>
                <Typography variant="body2" color="textPrimary" component="p">
                  0 likes
                </Typography>
                <Typography variant="body2" color="textPrimary" component="p">
                  Napaka taba ko
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card className={classes.friendsList} elevation={0}>
              <CardHeader
                avatar={
                  <Avatar src="https://scontent.fcrk1-3.fna.fbcdn.net/v/t1.6435-9/162384487_4020543097996574_4337182998067131726_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=174925&_nc_eui2=AeHEbegMwVzNnSyzvvPquh_9scju97htVt2xyO73uG1W3YN0GcXDIaKLcO5C3FwsjXUUqaBVU1gHx8_uorN7x5W6&_nc_ohc=07Rx1zihySsAX-N9zJr&_nc_ht=scontent.fcrk1-3.fna&oh=a035ecc4f66e7397cc8267c7daebd14f&oe=60DAC026" />
                }
                title="Denice Ann Dela Cruz"
              />
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Home;
