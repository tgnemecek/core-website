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
import { Image, LanguageDisplay, EventStatus } from "components";
import { getTintedBackground } from "utils";
import EventContext from "../../EventContext";

const Header: React.FC = () => {
  const {
    event: { title, subtitle, date, image, isOnline, language, tickets },
    priceRange,
  } = React.useContext(EventContext)!;

  const classes = useStyles();

  return (
    <section className={classes.section}>
      <Container>
        <div className={classes.gridContainer}>
          <div className={classes.imageWrapper}>
            <Image src={image} width={400} />
          </div>
          <div>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography variant="body1" color="textSecondary">
                  {moment(date).format("MMMM D, YYYY")}{" "}
                  <EventStatus event={{ tickets, date }} />
                </Typography>
                <Typography variant="h4" className={classes.title}>
                  {title}
                </Typography>
                <Typography variant="body1">{subtitle}</Typography>
              </CardContent>
              <CardActions className={classes.cardActions}>
                <Grid container justify="space-between">
                  <Grid item>
                    <div className={classes.extra}>
                      <LanguageDisplay code={language} showFlag flagSize={24} />
                      <Typography variant="body1">
                        {isOnline ? "Online" : "In Person"}
                      </Typography>
                    </div>
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

const cardMaxWidth = 600;
const cardHeight = 350;

const useStyles = makeStyles((theme) => ({
  section: {
    ...getTintedBackground(),
    padding: "100px 0 40px 0",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "500px 500px",
    gridTemplateRows: cardHeight,
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "250px 300px",
    },
  },
  imageWrapper: {
    boxShadow: theme.shadows[5],
    width: "100%",
    height: "100%",
    maxWidth: cardMaxWidth,
    margin: "auto",
    "& > *": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  },
  card: {
    height: "100%",
    position: "relative",
    boxShadow: theme.shadows[5],
    maxWidth: cardMaxWidth,
    margin: "auto",
  },
  title: {
    marginBottom: theme.spacing(2),
    fontSize: "1.6rem",
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
  extra: {
    display: "flex",
  },
}));
