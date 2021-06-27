import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../utils/firebase";
import {
  Card,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography,
  Button,
  Grid,
  Box,
  makeStyles
} from "@material-ui/core";
//icons
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

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
    width: 700,
    padding: 20,
    borderRadius: 10,
    border: "1px solid gray"
  },
  field: {
    margin: theme.spacing(0.5)
  },
  grid: {
    display: "flex",
    alignItems: "center"
  },
  name: {
    display: "flex",
    flexDirection: "row"
  },
  firstcol: {
    display: "flex",
    textAlign: "center",
    justifyContent: "center"
  }
}));
const db = firebase.firestore();
function SignUp() {
  const classes = useStyles();
  const history = useHistory("");

  const [payload, setPayload] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    LastName: "",
    FirstName: "",
    showPassword: false,
    showConfirmPassword: false
  });

  const handleChange = (prop) => (event) => {
    setPayload({ ...payload, [prop]: event.target.value });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setPayload({ ...payload, showPassword: !payload.showPassword });
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowConfirmPassword = () => {
    setPayload({
      ...payload,
      showConfirmPassword: !payload.showConfirmPassword
    });
  };

  const register = (event) => {
    event.preventDefault();

    if (!payload.email || !payload.password || !payload.confirmPassword) {
      alert("Please complete all fields!");
    } else if (payload.confirmPassword !== payload.password) {
      alert("Password do not match");
    } else if (payload.password.length <= 5) {
      alert("Password should be at least 6 characters");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((userCredential) => {
          const batch = db.batch();
          const postRef = db.collection("users").doc(useruid).doc();
          batch.set(postRef, {
            caption: state.caption,
            image_url: imageURL,
            posted_date: new Date()
          });

          batch
            .commit()
            .then(() => {})
            .catch((error) => {
              //err
            });

          alert("You have sign up successfully");
          firebase
            .auth()
            .signOut()
            .then(() => {
              // Sign-out successful.
            })
            .catch((error) => {
              // An error happened.
            });
          // Signed in

          // var user = userCredential.email;

          // ...
        })
        .catch((error) => {
          // var errorCode = error.code;
          var errorMessage = error.message;
          // ..
          alert(errorMessage);
        });
    }
  };
  return (
    <div className={classes.root}>
      <Card elevation={0} className={classes.card}>
        <Grid container spacing={1} className={classes.grid}>
          <Grid item xs={6} className={classes.firstcol}>
            <Typography variant="h4" color="textPrimary">
              <Box>Create</Box>
              <Box>New Account</Box>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <form className={classes.form}>
              <Box className={classes.name}>
                <TextField
                  className={classes.field}
                  id="FirstName"
                  onChange={handleChange("FirstName")}
                  label="FirstName"
                  variant="outlined"
                />
                <TextField
                  className={classes.field}
                  id="LastName"
                  onChange={handleChange("LastName")}
                  label="LastName"
                  variant="outlined"
                />
              </Box>
              <TextField
                className={classes.field}
                id="Email"
                onChange={handleChange("email")}
                label="Email"
                variant="outlined"
              />
              <FormControl className={classes.field} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={payload.showPassword ? "text" : "password"}
                  value={payload.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {payload.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
              <FormControl className={classes.field} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-confirmPassword">
                  Confirm password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-confirmPassword"
                  type={payload.showConfirmPassword ? "text" : "password"}
                  value={payload.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirmPassword visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                        edge="end"
                      >
                        {payload.showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={130}
                />
              </FormControl>
              <Button
                onClick={register}
                className={classes.field}
                variant="contained"
                color="primary"
              >
                REGISTER
              </Button>

              <Button
                onClick={() => history.push("/signin")}
                className={classes.field}
                variant="contained"
                color="default"
              >
                LOGIN?
              </Button>
            </form>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}

export default SignUp;
