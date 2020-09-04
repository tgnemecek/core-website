import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import { Container, Typography } from "@material-ui/core";

import Section from "components/Section";

const Explanation = ({ explanation }) => {
  return (
    <Container maxWidth="md">
      <Typography variant="body1" align="center">
        {explanation}
      </Typography>
    </Container>
  );
};

Explanation.prototypes = {
  explanation: PropTypes.string.isRequired,
};

export default Explanation;
