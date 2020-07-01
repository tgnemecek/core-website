import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Grid,
} from "@material-ui/core";
import Link from "components/Link/Link";

const Service = ({ title, image, url }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardActionArea component={Link} to={url}>
        <CardMedia image={image} component="img" />
        <CardContent>
          <Typography variant="h3" align="center">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Service;

const useStyles = makeStyles((theme) => ({}));
