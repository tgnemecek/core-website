import React from "react";
import { graphql, PageProps } from "gatsby";
import { Stripe } from "@stripe/stripe-js";
import { Backdrop, CircularProgress, Dialog } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import { EventPageDTO } from "types";
import { Layout, EventFeed, Footer, Navbar } from "components";
import {
  Aside,
  FixedBar,
  Header,
  ContentGrid,
  Body,
  Video,
  TicketsModal,
} from "./sections";
import EventContext from "./EventContext";

type EventPageWithLocation = EventPageDTO & {
  location: PageProps["location"];
};

const EventPage: React.FC<EventPageWithLocation> = ({
  data: {
    markdownRemark: {
      fields: { slug },
      frontmatter: { events: event },
    },
  },
}) => {
  const [loading, setLoading] = React.useState(false);
  const [ticketsModalOpen, setTicketsModalOpen] = React.useState(false);
  const [alreadyPurchased, setAlreadyPurchased] = React.useState(false);

  const getPriceRange = () => {
    const { min, max } = event.tickets.reduce(
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
    if (min === max) return `$${min} (USD)`;
    return `$${min} - $${max} (USD)`;
  };

  return (
    <EventContext.Provider
      value={{
        event,
        alreadyPurchased,
        setAlreadyPurchased,
        loading,
        setLoading,
        priceRange: getPriceRange(),
        setTicketsModalOpen,
      }}
    >
      <Layout>
        <Navbar />
        <main>
          <Header />
          <Video />
          {loading && (
            <Backdrop open={true} style={{ zIndex: 2000 }}>
              <CircularProgress />
            </Backdrop>
          )}
          <ContentGrid body={<Body />} aside={<Aside />}></ContentGrid>
          <EventFeed
            title="You might also like these events"
            filter={(currEvent) => currEvent.slug !== slug}
          />
          <FixedBar />
        </main>
        {ticketsModalOpen && <TicketsModal open />}
        <Footer paddingBottom={70} />
      </Layout>
    </EventContext.Provider>
  );
};

const EventPageWithSnackbar: React.FC<EventPageWithLocation> = (props) => (
  <SnackbarProvider maxSnack={3}>
    <EventPage {...props} />
  </SnackbarProvider>
);

export default EventPageWithSnackbar;

const useStyles = makeStyles((theme) => ({}));

export const pageQuery = graphql`
  query EventQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      fields {
        slug
      }
      frontmatter {
        events {
          id
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
            id
            description
            price
            endsOn
          }
        }
      }
    }
  }
`;
