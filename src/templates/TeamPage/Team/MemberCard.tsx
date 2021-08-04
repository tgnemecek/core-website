import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Card,
  CardActionArea,
  CardContent,
} from "@material-ui/core";
import LaunchIcon from "@material-ui/icons/Launch";
import Fade from "react-reveal/Fade";
import { Image } from "components";
import { Member } from "types";

const transition = "all 0.3s ease-in-out";

type MemberCardProps = Member & {
  delay?: number;
  idx: number;
  setMemberToView: React.Dispatch<React.SetStateAction<number>>;
};

const MemberCard: React.FC<MemberCardProps> = ({
  idx,
  name,
  role,
  photo,
  setMemberToView,
  delay = 0,
}) => {
  const [isHovering, setIsHovering] = React.useState(false);
  const classes = useStyles({ isHovering })();

  return (
    <Fade delay={delay}>
      <Card elevation={6} square>
        <CardActionArea
          onClick={() => setMemberToView(idx)}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className={classes.imageWrapper}>
            <Image
              alt={name}
              className={classes.image}
              src={photo}
              height={520}
              gravity="faces"
            />
            <div className={classes.shadow}></div>
            <Typography variant="subtitle2" className={classes.showMore}>
              Show More <LaunchIcon />
            </Typography>
          </div>
          <CardContent className={classes.content}>
            <Typography variant="h3">{name}</Typography>
            <Typography variant="body1">{role}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Fade>
  );
};

export default MemberCard;

type UseStylesProps = {
  isHovering: boolean;
};

const useStyles = ({ isHovering }: UseStylesProps) =>
  makeStyles((theme) => ({
    imageWrapper: {
      height: 520,
      maxHeight: 520,
      overflow: "hidden",
      position: "relative",
    },
    image: {
      height: "100%",
      width: "100%",
      objectFit: "cover",
      transform: `scale(${isHovering ? 1.2 : 1})`,
      transition,
    },
    shadow: {
      position: "absolute",
      width: "100%",
      height: "100%",
      boxShadow: `inset 0px -97px 54px -37px ${
        isHovering ? "white" : theme.palette.primary.main
      }`,
      top: 0,
      left: 0,
      transition,
    },
    showMore: {
      display: "flex",
      alignItems: "center",
      position: "absolute",
      bottom: 0,
      padding: 15,
      left: isHovering ? 0 : -140,
      transition: "all 0.5s ease-in-out",
      "& svg": {
        marginLeft: 5,
      },
    },
    content: {
      backgroundColor: isHovering ? "white" : theme.palette.primary.main,
      transition,
      "& h3, p": {
        color: isHovering ? "black" : theme.palette.common.white,
        transition,
      },
    },
  }));
