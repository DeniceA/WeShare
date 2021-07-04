import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import {
  Toolbar,
  AppBar,
  Grid,
  makeStyles,
  IconButton,
  Divider,
  useScrollTrigger,
  CssBaseline,
  Typography
} from "@material-ui/core";
import AddPost from "../modals/AddPost";
import Home from "@material-ui/icons/HomeOutlined";
import Profile from "@material-ui/icons/FaceOutlined";
import Add from "@material-ui/icons/AddCircleOutlineOutlined";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    background: "white",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  title: {
    background: "red"
  }
}));
function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func
};

export default function Nav({ props, useruid }) {
  const [openAddPost, setOpenAddPost] = useState(false);
  const history = useHistory("");
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar className={classes.toolbar}>
            <Grid container xs={12}>
              <Grid item xs={5}>
                <Typography color="Primary" variant="h4">
                  WeShare
                </Typography>
              </Grid>
              <Grid item xs={3}></Grid>
              <Grid item xs={4}>
                <IconButton
                  color="Primary"
                  component="span"
                  onClick={() => setOpenAddPost(true)}
                >
                  <Add />
                </IconButton>
                <IconButton
                  color="Primary"
                  component="span"
                  onClick={() => history.push("/home")}
                >
                  <Home />
                </IconButton>
                <IconButton
                  color="Primary"
                  component="span"
                  onClick={() => history.push("/profile")}
                >
                  <Profile />
                </IconButton>
              </Grid>
            </Grid>
          </Toolbar>
          <Divider />
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <AddPost useruid={useruid} open={openAddPost} setOpen={setOpenAddPost} />
    </React.Fragment>
  );
}
