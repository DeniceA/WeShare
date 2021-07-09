import React, { useState, useEffect } from "react";

import {
  makeStyles,
  Fade,
  Modal,
  Backdrop,
  Typography,
  Box,
  InputBase,
  Button
} from "@material-ui/core";
import firebase from "../utils/firebase";

//icons

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    flexDirection: "column"
  },
  caption: {
    width: 500
  },
  media: {
    height: 0,
    paddingTop: "50%" // 16:9
  },
  fileInput: {
    display: "none"
  }
}));
const db = firebase.firestore();

export default function EditPost({ open, setOpen, useruid, postid }) {
  const classes = useStyles();
  const [state, setState] = useState({
    caption: "asdasd",
    changeCaption: "",
    imageurl: "",
    useruid: ""
  });

  const handleChange = (prop) => (event) => {
    setState({ ...state, [prop]: event.target.value });
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(postid);
  useEffect(() => {
    const currentuser = firebase.auth().currentUser;
    const fetchData = () => {
      db.collection("users")
        .doc(currentuser.uid)
        .collection("post")
        .doc(postid)
        .onSnapshot((doc) => {
          //success
          if (doc.exists) {
            let usersDoc = doc.data();
            setState({
              caption: usersDoc.caption,
              changeCaption: usersDoc.caption,
              imageurl: usersDoc.image_url,
              useruid: currentuser.uid
            });
          } else {
            //
          }
        });
    };
    fetchData();
  }, []);
  const confirm = (e) => {
    e.preventDefault();
    const currentuser = firebase.auth().currentUser;
    const batch = db.batch();
    let EditRef = db
      .collection("users")
      .doc(currentuser.uid)
      .collection("post")
      .doc(postid);
    batch.update(EditRef, {
      caption: state.changeCaption
    });

    batch
      .commit()
      .then(() => {
        handleClose();
      })
      .catch((error) => {
        //err
      });
  };

  return (
    <div>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Typography variant="h5">
              <Box>Edit Caption</Box>
            </Typography>

            <InputBase
              className={classes.caption}
              onChange={handleChange("changeCaption")}
              placeholder="Write a post"
              rows={5}
              multiline
            />
            <Button onClick={confirm} color="primary" variant="contained">
              Post
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
