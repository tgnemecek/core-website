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
        <Grid container justify="space-between">
          <Grid item xs={5}>
            <div className={classes.imageWrapper}>
              <Image src={image} width={400} />
            </div>
          </Grid>
          <Grid item xs={5}>
            <Card raised className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography variant="subtitle1" color="textSecondary">
                  {moment(date).format("MMMM D, YYYY")}
                </Typography>
                <Typography variant="h5">{title}</Typography>
                <Typography variant="body1">{subtitle}</Typography>
              </CardContent>
              <CardActions>
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
          </Grid>
        </Grid>
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
    padding: 20,
  },
  cardContent: {
    minHeight: 300,
  },
}));
