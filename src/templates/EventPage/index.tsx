import React from "react";
import { graphql } from "gatsby";
import { Container } from "@material-ui/core";
import { EventPageDTO } from "types";
import { Layout, EventFeed } from "components";
import { Aside, Header, ContentGrid, Body, Video } from "./sections";

const EventPage: React.FC<EventPageDTO> = ({
  data: {
    markdownRemark: {
      fields: { slug },
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
    return `$${min} - $${max}`;
  };

  const toggleTicketsModal = () => {
    return;
  };

  return (
    <Layout>
      <Header
        title={title}
        subtitle={subtitle}
        date={date}
        image={image}
        isOnline={isOnline}
        location={location}
        priceRange={getPriceRange()}
      />
      <Video video={video} />
      <ContentGrid>
        <Body title={title} subtitle={subtitle} description={description} />
        <Aside
          date={date}
          isOnline={isOnline}
          location={location}
          duration={duration}
          language={language}
          toggleTicketsModal={toggleTicketsModal}
        />
      </ContentGrid>
      <EventFeed
        title="You might also like these events"
        filter={(event) => event.slug !== slug}
      />
    </Layout>
  );
};

export default EventPage;

export const pageQuery = graphql`
  query EventQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      fields {
        slug
      }
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
