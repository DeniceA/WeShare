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

export default function AddPost({ open, setOpen }) {
  const classes = useStyles();
  const [post, setPost] = useState({
    caption: "",
    uploadDate: new Date(),
    imageURL: ""
  });

  const handleChange = (prop) => (event) => {
    setPost({ ...post, [prop]: event.target.value });
  };

  const onFileChange = async (event) => {
    const file = event.target.files[0];
    var storageRef = firebase.storage().ref();
    var fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setPost({ imageURL: await fileRef.getDownloadURL() });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const posted = (event) => {
    setPost({ uploadDate: Date.now() });
    event.preventDefault();
    console.log(post);
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
              id="filled-textarea"
              placeholder="Write a post"
              rows={5}
              multiline
            />
            <Button component="label">
              <Image color="inherit" />
              <input type="file" onChange={onFileChange} accept="image/*" />
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
