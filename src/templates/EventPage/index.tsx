import React from "react";
import { graphql } from "gatsby";
import { EventPageDTO } from "types";

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
  return (
    <div>
      EventPage
      <div>
        {[
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
        ]
          .filter((value) => typeof value === "string")
          .map((value, i) => (
            <div key={i} style={{ marginTop: 25 }}>
              {value}
            </div>
          ))}
      </div>
    </div>
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
