import React, { useState, useEffect } from "react";
import { ThemeProvider, makeStyles, Typography } from "@material-ui/core";
import theme from "./utils/theme";
import firebase from "./utils/firebase";
import PrivateRoute from "./router/privateRoute";
import PublicRoute from "./router/publicRoute";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ChangeProfile from "./pages/ChangeProfile";

var useStyles = makeStyles(() => ({
  loading: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

function App() {
  const classes = useStyles();
  const [state, setstate] = useState({
    isAuth: false,
    isLoading: true
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setstate({ isAuth: true, isLoading: false });
      } else {
        setstate({ isAuth: false, isLoading: false });
      }
    });
  }, []);

  if (state.isLoading) {
    return (
      <div className={classes.loading}>
        <Typography variant="h4">Loading...</Typography>
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" exact />
          </Route>
          <PrivateRoute component={Home} isAuth={state.isAuth} path="/home" />
          <PrivateRoute
            component={Profile}
            isAuth={state.isAuth}
            path="/profile"
          />
          <PrivateRoute
            component={ChangeProfile}
            isAuth={state.isAuth}
            path="/changeprofile"
          />
          <PublicRoute
            component={SignIn}
            isAuth={state.isAuth}
            restricted={true}
            path="/signin"
          />
          <PublicRoute
            component={SignUp}
            isAuth={state.isAuth}
            restricted={true}
            path="/signup"
            exact
          />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
export default App;
