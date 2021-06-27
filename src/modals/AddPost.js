import React, { useState } from "react";

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
import Image from "@material-ui/icons/Image";

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
    width: 500,
    [theme.breakpoints.down("xs")]: {
      width: 200
    }
  },
  fileInput: {
    display: "none"
  }
}));
const db = firebase.firestore();

export default function AddPost({ open, setOpen, useruid }) {
  const classes = useStyles();
  const [state, setState] = useState({
    caption: ""
  });
  const [imageURL, setImageURL] = useState("");

  const handleChange = (prop) => (event) => {
    setState({ ...state, [prop]: event.target.value });
  };
  const onFileChange = async (event) => {
    const file = event.target.files[0];
    var storageRef = firebase.storage().ref();
    var fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setImageURL(await fileRef.getDownloadURL());
  };

  const handleClose = () => {
    setOpen(false);
  };
  const posted = (e) => {
    e.preventDefault();
    if (imageURL === "") {
      alert("add image");
    } else {
      const batch = db.batch();
      const postRef = db
        .collection("users")
        .doc(useruid)
        .collection("post")
        .doc();
      batch.set(postRef, {
        caption: state.caption,
        image_url: imageURL,
        posted_date: new Date()
      });

      batch
        .commit()
        .then(() => {
          setImageURL("");
          handleClose();
        })
        .catch((error) => {
          //err
        });
    }
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
              <Box>Create a post</Box>
            </Typography>

            <InputBase
              className={classes.caption}
              onChange={handleChange("caption")}
              placeholder="Write a post"
              rows={5}
              multiline
            />
            <Button component="label">
              <Image color="inherit" />
              <input
                type="file"
                onChange={onFileChange}
                accept="image/*"
                required
              />
            </Button>
            <Button onClick={posted} color="primary" variant="contained">
              Post
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
