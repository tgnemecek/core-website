import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  ButtonBase,
  Divider,
  Typography,
  IconButton,
  Grid,
  Paper,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import YouTube from "react-youtube";
import Fade from "@material-ui/core/Fade";
import Modal from "components/Modal";
import Link from "components/Link";
import { theme } from "components/theme";
import { getVideoId } from "src/util";

const timeout = 2000;

const MemberModal = ({ memberToView: { name, role, bio, video }, onClose }) => {
  const [modalReady, setModalReady] = React.useState(false);
  const classes = useStyles({ modalReady })();

  const _onReady = (e) => {
    e.target.playVideo();
  };

  React.useEffect(() => {
    setTimeout(() => {
      setModalReady(true);
    }, timeout);
  }, []);

  return (
    <Modal open={true} onClose={onClose}>
      <Fade in timeout={timeout}>
        <Paper square elevation={6} className={classes.paper}>
          <Grid container>
            <Grid item xs={6} className={classes.leftSide}>
              <div className={classes.videoWrapper}>
                <YouTube
                  className={classes.video}
                  videoId={getVideoId(video)}
                  onReady={_onReady}
                  playerVars={
                    {
                      // autoplay: 1,
                      // origin: window.location.origin,
                      // host: "http://www.youtube.com",
                      // origin: window.location.host,
                    }
                  }
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.content}>
                <Grid container justify="space-between">
                  <Grid item>
                    <Typography variant="h4">{name}</Typography>
                    <Typography variant="body1" gutterBottom>
                      {role}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton onClick={onClose}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                </Grid>
                <Divider light />
                <Typography variant="body1" className={classes.bio}>
                  {bio}
                </Typography>
              </div>
              <ButtonBase className={classes.bottomButton} onClick={onClose}>
                Back
              </ButtonBase>
            </Grid>
          </Grid>
        </Paper>
      </Fade>
    </Modal>
  );
};

const useStyles = ({ modalReady }) =>
  makeStyles((theme) => ({
    paper: {
      width: "80vw",
    },
    leftSide: {
      backgroundColor: "black",
    },
    videoWrapper: {
      paddingTop: "56.25%",
      overflow: "hidden",
      position: "relative",
      height: "100%",
    },
    video: {
      position: "absolute",
      bottom: modalReady ? 0 : "100%",
      left: 0,
      width: "100%",
      height: "100%",
      transition: "all 2s ease-in-out",
    },
    content: {
      padding: theme.spacing(4),
    },
    bio: {
      overflow: "auto",
      height: 400,
      paddingTop: theme.spacing(2),
    },
    bottomButton: {
      color: "white",
      backgroundColor: theme.palette.grey[500],
      width: "100%",
      padding: theme.spacing(2),
      transition: "all 0.5s",
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
      },
    },
  }));

export default MemberModal;
