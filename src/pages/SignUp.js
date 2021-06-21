import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import firebase from "../utils/firebase";
import theme from "../utils/theme";
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
  useMediaQuery
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
    width: 250,
    padding: 20,
    borderRadius: 10,
    border: "1px solid black"
  },
  field: {
    margin: theme.spacing(0.5)
  }
}));

function SignUp() {
  const classes = useStyles();
  const history = useHistory("");

  const [payload, setPayload] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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
        <form className={classes.form}>
          <Typography variant="h5" color="textPrimary">
            Create new Account
          </Typography>

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
                    {payload.showPassword ? <Visibility /> : <VisibilityOff />}
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
      </Card>
    </div>
  );
}

export default SignUp;
