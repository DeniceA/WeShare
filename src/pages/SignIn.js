import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../utils/firebase";

import {
  makeStyles,
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
  Box
} from "@material-ui/core";
//icons
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    height: "100vh",
    width: "100vw",
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
    width: 300,
    padding: 20,
    borderRadius: 10,
    border: "1px solid gray"
  },

  field: {
    margin: theme.spacing(1)
  },
  grid: {
    display: "flex",
    alignItems: "center"
  },
  items: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));
function SignIn() {
  const classes = useStyles();
  const history = useHistory("");
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const login = (event) => {
    event.preventDefault();

    if (!values.email || !values.password) {
      alert("Please complete all fields!");
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(values.email, values.password)
        .then((signedInUser) => {
          // Signed in

          alert("Welcome " + signedInUser.user.email);

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
      <Grid container spacing={2} className={classes.grid}>
        <Grid item xs={6} className={classes.items}>
          <Typography variant="h2" color="primary">
            <Box>WeShare</Box>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Card elevation={0} className={classes.card}>
            <form className={classes.form}>
              <Typography variant="h4" color="textPrimary">
                Login
              </Typography>

              <TextField
                className={classes.field}
                value={values.email}
                onChange={handleChange("email")}
                label="Email@email.com"
                variant="outlined"
              />
              <FormControl className={classes.field} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
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
              <Button
                onClick={login}
                className={classes.field}
                variant="contained"
                color="primary"
              >
                LOGIN
              </Button>

              <Button
                onClick={() => history.push("/Signup")}
                className={classes.field}
                variant="contained"
                color="default"
              >
                Create New account
              </Button>
            </form>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default SignIn;
