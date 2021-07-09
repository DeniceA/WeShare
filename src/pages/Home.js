import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import firebase from "../utils/firebase";
import EditPost from "../modals/EditPost";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import moment from "moment";
import {
  Grid,
  makeStyles,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  CardHeader,
  Avatar,
  Popper,
  Fade,
  Button,
  Paper
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
    position: "fixed",
    background: "#fafafa"
  },
  friends: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: theme.spacing(1)
  },
  card: {
    border: "0.5px solid rgb(215, 40, 126)",
    marginBottom: 20
  },
  paper: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column"
  }
}));

const db = firebase.firestore();
function Home() {
  const [openEditPost, setOpenEditPost] = useState(false);
  const [postid, setPostid] = useState("asdasd");
  const classes = useStyles();
  let [state, setState] = useState({
    useruid: "",
    firstName: "",
    lastName: "",
    profileURL: "",
    imageURL: "",
    NumberOfFriends: 0,
    //
    likenumber: "",
    isLiked: "like",
    friendsFirstName: "",
    friendsLastName: "",
    friendsProfile: ""
  });
  const [post, setPost] = useState([]);
  const [userLike, setUserLike] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const currentuser = firebase.auth().currentUser;
      db.collection("users")
        .doc(currentuser.uid)
        .get()
        .then((doc) => {
          //success
          if (doc.exists) {
            const usersDoc = doc.data();
            setState({
              firstName: usersDoc.first_name,
              lastName: usersDoc.last_name,
              NumberOfFriends: usersDoc.friends_number,
              useruid: currentuser.uid,
              profileURL: usersDoc.profile_url,
              friends: usersDoc.friends
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
          let likecount = [];
          doc.forEach((p) => {
            postlist.push(p.data());
            likecount.push(p.id);
          });
          setPost(postlist);
          setUserLike(likecount);
        });
    };

    fetchData();
  }, []);
  const onEdit = (e) => {
    setPostid(userLike[e]);
    //
    //
    setOpenEditPost(true);
  };
  const liked = (e) => {
    const batch = db.batch();
    let likesRef = db
      .collection("users")
      .doc(state.useruid)
      .collection("post")
      .doc(userLike[e].toString());
    batch.update(likesRef, {
      likes: firebase.firestore.FieldValue.increment(1)
    });
    batch
      .commit()
      .then(() => {})
      .catch((error) => {
        //err
      });
  };

  const onDelete = (e) => {
    var answer = window.confirm("Are you sure ?");
    if (answer) {
      const batch = db.batch();
      let deleteRef = db
        .collection("users")
        .doc(state.useruid)
        .collection("post")
        .doc(userLike[e].toString());
      batch.delete(deleteRef, {});

      batch
        .commit()
        .then(() => {})
        .catch((error) => {
          //err
        });
    } else {
      //some code
    }
  };

  return (
    <div>
      <Nav useruid={state.useruid} />
      <div className={classes.root}>
        <Grid container spacing={2} className={classes.container}>
          <Grid item xs={8}>
            {post.map((p, index) => (
              <Card className={classes.card}>
                <CardHeader
                  avatar={<Avatar src={state.profileURL} />}
                  action={
                    <PopupState variant="popper" popupId="demo-popup-popper">
                      {(popupState) => (
                        <div>
                          <IconButton {...bindToggle(popupState)}>
                            <MoreVertIcon />
                          </IconButton>
                          <Popper {...bindPopper(popupState)} transition>
                            {({ TransitionProps }) => (
                              <Fade {...TransitionProps} timeout={350}>
                                <Paper>
                                  <div className={classes.paper}>
                                    <Button onClick={() => onEdit(index)}>
                                      edit
                                    </Button>
                                    <Button onClick={() => onDelete(index)}>
                                      delete
                                    </Button>
                                  </div>
                                </Paper>
                              </Fade>
                            )}
                          </Popper>
                        </div>
                      )}
                    </PopupState>
                  }
                  title={state.firstName + " " + state.lastName}
                  subheader={moment(
                    p.posted_date.toDate().toString()
                  ).calendar()}
                />

                <CardMedia className={classes.media} image={p.image_url} />
                <CardActions>
                  <IconButton key={index} onClick={() => liked(index)}>
                    <FavoriteIcon />
                  </IconButton>
                </CardActions>
                <CardContent>
                  <Typography variant="body2" color="textPrimary" component="p">
                    {p.likes} likes
                  </Typography>
                  <Typography variant="body2" color="textPrimary" component="p">
                    {p.caption}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Grid>
          <Grid item xs={4}>
            <Card className={classes.friendsList} elevation={0}>
              <CardHeader
                avatar={<Avatar src={state.profileURL} />}
                title={state.firstName + " " + state.lastName}
                subheader={"friends: " + state.NumberOfFriends}
              />
            </Card>
          </Grid>
        </Grid>
      </div>
      <EditPost
        open={openEditPost}
        setOpen={setOpenEditPost}
        useruid={state.useruid}
        postid={postid}
      />
    </div>
  );
}

export default Home;
