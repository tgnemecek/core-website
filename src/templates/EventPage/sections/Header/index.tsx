import React from "react";
import moment from "moment";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Image } from "components";
import { EventType } from "types";

type HeaderProps = Pick<
  EventType,
  "title" | "subtitle" | "date" | "image" | "isOnline" | "location"
> & {
  priceRange: string;
};

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  date,
  image,
  isOnline,
  location,
  priceRange,
}) => {
  const classes = useStyles();
  console.log({ isOnline });
  return (
    <section className={classes.section}>
      <Container>
        <div className={classes.gridContainer}>
          <div className={classes.imageWrapper}>
            <Image src={image} width={400} />
          </div>
          <div>
            <Card raised className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography variant="subtitle1" color="textSecondary">
                  {moment(date).format("MMMM D, YYYY")}
                </Typography>
                <Typography variant="h5">{title}</Typography>
                <Typography variant="body1">{subtitle}</Typography>
              </CardContent>
              <CardActions className={classes.cardActions}>
                <Grid container justify="space-between">
                  <Grid item>
                    <Typography variant="body1">
                      {isOnline ? "Online Event" : location}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" color="textSecondary">
                      {priceRange}
                    </Typography>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Header;

const backgroundImage =
  "url(https://llandscapes-10674.kxcdn.com/wp-content/uploads/2019/07/lighting.jpg)";
const overlaidBackground = `linear-gradient(0deg, rgb(255 255 255 / 81%), rgb(255 255 255 / 81%)), ${backgroundImage}`;

const useStyles = makeStyles((theme) => ({
  section: {
    background: overlaidBackground,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    padding: "40px 0",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "500px 500px",
    gridTemplateRows: 300,
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "200px 300px",
    },
  },
  imageWrapper: {
    width: "100%",
    height: "100%",
    "& > *": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  },
  card: {
    height: "100%",
    position: "relative",
  },
  cardContent: {
    padding: 20,
  },
  cardActions: {
    position: "absolute",
    left: 0,
    bottom: 0,
    padding: 20,
    width: "100%",
  },
}));
