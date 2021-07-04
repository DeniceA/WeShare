import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import firebase from "../utils/firebase";
import {
  makeStyles,
  Card,
  CardMedia,
  Avatar,
  Box,
  Typography,
  Paper,
  Grid,
  CardActionArea
} from "@material-ui/core";
//icons
import ImageOutlined from "@material-ui/icons/ImageOutlined";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: 20
  },
  profile: {
    marginTop: 40,
    position: "fixed",
    border: "0.5px solid rgb(215, 40, 126)"
  },
  profilePicture: {
    width: 150,
    height: 150
  },
  card: { padding: theme.spacing(2) },
  name: { marginTop: theme.spacing(2) },
  details: {
    marginLeft: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  fandp: {
    display: "flex",
    flexDirection: "row"
  },
  textPost: {
    marginLeft: 40,
    textAlign: "center"
  },
  textFriends: {
    textAlign: "center"
  },
  media: {
    height: 0,
    paddingTop: "100%" // 16:9
  },
  post: {
    height: 200,
    width: 200,
    border: "0.5px solid rgb(215, 40, 126)"
  },

  postlogo: {
    marginTop: theme.spacing(2)
  },
  paper: {
    margin: "auto",
    padding: theme.spacing(2),
    alignItems: "center"
  },
  textPost2: {
    textAlign: "center",
    marginBottom: theme.spacing(3)
  },
  profiledetails: {
    padding: 30,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    maxHeight: 500
  },
  profilemedia: {
    height: 140
  },
  icon: {
    display: "flex",
    justifyContent: "center"
  }
}));
const db = firebase.firestore();
function Profile() {
  const classes = useStyles();

  const [state, setState] = useState({
    useruid: "",
    firstName: "",
    lastName: "",
    profileURL: "",
    imageURL: "",
    numberOfFriends: 0,
    numberOfPost: 0
  });
  const [post, setPost] = useState([]);
  useEffect(() => {
    const fetchData = () => {
      const currentuser = firebase.auth().currentUser;
      db.collection("users")
        .doc(currentuser.uid)
        .onSnapshot((doc) => {
          //success
          if (doc.exists) {
            let usersDoc = doc.data();
            setState({
              firstName: usersDoc.first_name,
              lastName: usersDoc.last_name,
              numberOfFriends: usersDoc.friends_number,
              useruid: currentuser.uid,
              profileURL: usersDoc.profile_url,
              numberOfPost: usersDoc.post_number
            });
            fetchPosts(currentuser.uid);
          } else {
            //
          }
        });
    };
    const fetchPosts = (useruid) => {
      db.collection("users")
        .doc(useruid)
        .collection("post")
        .orderBy("posted_date", "desc")
        .onSnapshot((doc) => {
          let postlist = [];
          doc.forEach((p) => {
            postlist.push(p.data());
          });
          setPost(postlist);
        });
    };
    fetchData();
  }, []);
  return (
    <div className={classes.root}>
      <Nav useruid={state.useruid} />
      <Grid container spacing={2} alignItems="flex-start">
        <Grid item xs={3}>
          <Card className={classes.profile}>
            <CardActionArea className={classes.profiledetails}>
              <Avatar
                src={state.profileURL}
                className={classes.profilePicture}
                m={1}
              />

              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                className={classes.name}
              >
                {state.firstName + " " + state.lastName}
              </Typography>
              <Box className={classes.fandp}>
                <Typography variant="body1" className={classes.textFriends}>
                  <Box>Friends</Box>
                  <Box className="numberOfFriends">0</Box>
                </Typography>
                <Typography variant="body1" className={classes.textPost}>
                  <Box>Post</Box>
                  <Box fontWeight={600}>{state.numberOfPost}</Box>
                </Typography>
              </Box>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper} elevation={0}>
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.textPost2}
            >
              <Box className={classes.icon}>
                <ImageOutlined />
                <Box>Post</Box>
              </Box>
            </Typography>

            <Grid container spacing={4} justify="center">
              {post.map((p) => (
                <Grid item xs={1.5}>
                  <Card className={classes.post}>
                    <CardMedia className={classes.media} image={p.image_url} />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Profile;
