import React from "react";
import { Link } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import {
  ButtonBase,
  IconButton,
  Divider,
  Typography,
  Grid,
  Paper,
  Hidden,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import YouTube from "react-youtube";
import Fade from "@material-ui/core/Fade";
import Modal from "components/Modal";
import Image from "components/Image";
import ReplyIcon from "@material-ui/icons/Reply";
import { getVideoId, getImageId } from "src/util";
import { MemberType } from "./types";

const timeout = 2000;

type MemberModalProps = {
  memberToView: MemberType;
  onClose: () => void;
};

const MemberModal: React.FC<MemberModalProps> = ({
  memberToView: { name, role, bio, photo, video, linkedin },
  onClose,
}) => {
  const [modalReady, setModalReady] = React.useState(false);
  const classes = useStyles({ modalReady, video })();

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setModalReady(true);
    }, timeout);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Modal open={true} onClose={onClose}>
      <Fade in timeout={timeout}>
        <Paper square elevation={6} className={classes.paper}>
          <div className={classes.gridContainer}>
            <div className={classes.leftSide}>
              {video ? (
                <div className={classes.videoWrapper}>
                  <YouTube
                    className={classes.video}
                    videoId={getVideoId(video)}
                  />
                </div>
              ) : (
                <div className={classes.imageWrapper}>
                  <Image
                    alt={name}
                    src={photo}
                    width="550"
                    height="500"
                    gravity="faces"
                  />
                </div>
              )}
            </div>
            <div>
              <div className={classes.content}>
                <div>
                  <div className={classes.header}>
                    <Image
                      alt={name}
                      className={classes.thumbnail}
                      src={photo}
                      width="70"
                      height="70"
                      gravity="faces"
                    />
                    <div>
                      <Typography variant="h4">{name}</Typography>
                      <Typography variant="body1" gutterBottom>
                        {role}
                      </Typography>
                    </div>
                  </div>
                  <IconButton onClick={onClose} className={classes.closeButton}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </div>
                <Divider light />
                <Typography variant="body1" className={classes.bio}>
                  {bio}
                </Typography>
              </div>
              {linkedin && (
                <div className={classes.social}>
                  <IconButton
                    component="a"
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="34"
                      height="34"
                      data-supported-dps="34x34"
                      focusable="false"
                    >
                      <g transform="scale(.7083)" fillRule="evenodd">
                        <rect
                          fill="#FFF"
                          x="1"
                          y="1"
                          width="46"
                          height="46"
                          rx="4"
                        ></rect>
                        <path
                          d="M0 4.01A4.01 4.01 0 014.01 0h39.98A4.01 4.01 0 0148 4.01v39.98A4.01 4.01 0 0143.99 48H4.01A4.01 4.01 0 010 43.99V4.01zM19 18.3h6.5v3.266C26.437 19.688 28.838 18 32.445 18 39.359 18 41 21.738 41 28.597V41.3h-7V30.159c0-3.906-.937-6.109-3.32-6.109-3.305 0-4.68 2.375-4.68 6.109V41.3h-7v-23zM7 41h7V18H7v23zm8-30.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
                          fill="#0077B5"
                        ></path>
                      </g>
                    </svg>
                  </IconButton>
                </div>
              )}
              <Typography variant="body1" className={classes.watchVideo}>
                <ReplyIcon />
                <Link to={video} target="_blank" rel="noopener noreferrer">
                  Watch Video
                </Link>
              </Typography>
              <ButtonBase className={classes.bottomButton} onClick={onClose}>
                Back
              </ButtonBase>
            </div>
          </div>
        </Paper>
      </Fade>
    </Modal>
  );
};

type UseStylesProps = {
  modalReady: boolean;
  video?: string;
};

const useStyles = ({ modalReady, video }: UseStylesProps) =>
  makeStyles((theme) => ({
    paper: {
      width: "calc(100vw - 30px)",
      maxWidth: "1200px",
      overflow: "hidden",
    },
    gridContainer: {
      display: "grid",
      position: "relative",
      gridTemplateColumns: "50% 50%",
      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "1fr",
      },
    },
    leftSide: {
      backgroundColor: "black",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    header: {
      display: "grid",
      gridTemplateColumns: "auto 1fr",
      gap: "15px",
    },
    closeButton: {
      position: "absolute",
      top: 0,
      right: 0,
    },
    thumbnail: {
      borderRadius: "50%",
      marginBottom: theme.spacing(2),
      boxShadow: theme.shadows[4],
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    imageWrapper: {
      height: "100%",
      overflow: "hidden",
      "& img": {
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },
    },
    videoWrapper: {
      paddingTop: "56.25%",
      overflow: "hidden",
      position: "relative",
      height: "100%",
      zIndex: 1,
    },
    video: {
      position: "absolute",
      top: 0,
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
      maxHeight: "50vh",
      paddingTop: theme.spacing(2),
    },
    watchVideo: {
      visibility: video ? "visible" : "hidden",
      fontSize: "1rem",
      position: "relative",
      left: modalReady ? 0 : -50,
      opacity: modalReady ? 1 : 0,
      transition: "all 0.5s",
    },
    social: {
      padding: `0 ${theme.spacing(4)}px`,
      textAlign: "right",
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
