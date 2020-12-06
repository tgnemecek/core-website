import React from "react";
import { graphql } from "gatsby";
import { EventPageDTO } from "types";
import { Header } from "./sections";

const EventPage: React.FC<EventPageDTO> = ({
  data: {
    markdownRemark: {
      frontmatter: { events },
    },
  },
}) => {
  const {
    title,
    subtitle,
    description,
    image,
    video,
    date,
    duration,
    language,
    isOnline,
    location,
    tickets,
  } = events;
  console.log({
    title,
    subtitle,
    description,
    image,
    video,
    date,
    duration,
    language,
    isOnline,
    location,
    tickets,
  });

  const getPriceRange = () => {
    const { min, max } = tickets.reduce(
      (acc, { price }) => {
        return {
          min: price < acc.min ? price : acc.min,
          max: price > acc.max ? price : acc.max,
        };
      },
      {
        min: 999,
        max: 0,
      }
    );
    return `$${min}-${max}`;
  };

  return (
    <>
      <Header
        title={title}
        subtitle={subtitle}
        date={date}
        image={image}
        isOnline={isOnline}
        location={location}
        priceRange={getPriceRange()}
      />
    </>
  );
};

export default EventPage;

export const pageQuery = graphql`
  query EventQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        events {
          title
          subtitle
          description
          image
          video
          date
          duration
          language
          isOnline
          location
          tickets {
            description
            price
            endsOn
          }
        }
      }
    }
  }
`;
