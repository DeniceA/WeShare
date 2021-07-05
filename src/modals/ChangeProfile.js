import { React, useState, useEffect } from "react";

import firebase from "../utils/firebase";
import Nav from "../components/Nav";
import {
  Card,
  TextField,
  Typography,
  Button,
  Grid,
  makeStyles,
  Modal,
  Fade,
  Backdrop
} from "@material-ui/core";
//icons
var useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },

  form: {
    display: "flex",
    flexDirection: "column"
  },
  card: {
    width: 400,
    padding: 20,
    borderRadius: 10,
    border: "1px solid gray"
  },
  field: {
    margin: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(0.5)
  },
  file: {
    margin: theme.spacing(0.5)
  },
  name: {
    padding: 0,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row"
  },
  firstname: {
    marginRight: 10
  }
}));

const db = firebase.firestore();
function ChangeProfile({ open, setOpen, useruid }) {
  const classes = useStyles();

  const [state, setState] = useState({
    firstName: "",
    lastName: "",

    useruid: "",
    changeFirstName: "",
    changeLastName: "",
    changeBio: ""
  });

  const handleChange = (prop) => (event) => {
    setState({ ...state, [prop]: event.target.value });
  };

  const [imageURL, setImageURL] = useState("");

  const onFileChange = async (event) => {
    const file = event.target.files[0];
    var storageRef = firebase.storage().ref();
    var fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setImageURL(await fileRef.getDownloadURL());
  };

  useEffect(() => {
    const currentuser = firebase.auth().currentUser;

    const fetchData = () => {
      db.collection("users")
        .doc(currentuser.uid)
        .onSnapshot((doc) => {
          //success
          if (doc.exists) {
            let usersDoc = doc.data();
            setState({
              firstName: usersDoc.first_name,
              lastName: usersDoc.last_name,
              useruid: currentuser.uid,
              changeFirstName: state.firstName,
              changeLastName: state.lastName
            });
          } else {
            //
          }
        });
    };
    fetchData();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const confirm = (event) => {
    event.preventDefault();
    const batch = db.batch();

    let EditRef = db.collection("users").doc(state.useruid);
    batch.update(EditRef, {
      profile_url: imageURL,
      first_name: state.changeFirstName,
      last_name: state.changeLastName
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
          <div className={classes.root}>
            <Nav />
            <Card elevation={0} className={classes.card}>
              <Grid item xs={12}>
                <div className={classes.form}>
                  <div className={classes.name} spacing={1}>
                    <TextField
                      className={classes.firstname}
                      onChange={handleChange("changeFirstName")}
                      label="First name"
                      defaultValue={state.firstName}
                      variant="outlined"
                    />
                    <TextField
                      onChange={handleChange("changeLastName")}
                      label="Last name"
                      defaultValue={state.lastName}
                      variant="outlined"
                    />
                  </div>
                  <TextField
                    label="bio"
                    multiline
                    rows={4}
                    defaultValue={state.bio}
                    onChange={handleChange("bio")}
                    variant="outlined"
                  />
                  <div className={classes.file}>
                    <Typography variant="subtitle1">
                      Change profile pic
                    </Typography>
                    <input
                      type="file"
                      onChange={onFileChange}
                      accept="image/*"
                    />
                  </div>

                  <Button
                    onClick={confirm}
                    className={classes.button}
                    variant="contained"
                    color="primary"
                  >
                    CONFIRM
                  </Button>

                  <Button
                    onClick={() => handleClose()}
                    className={classes.button}
                    variant="contained"
                    color="default"
                  >
                    BACK
                  </Button>
                </div>
              </Grid>
            </Card>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default ChangeProfile;
