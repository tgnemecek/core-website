import React from "react";
import { graphql, PageProps } from "gatsby";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Backdrop, CircularProgress, Dialog } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import { EventPageDTO, TicketType } from "types";
import { Layout, EventFeed, Footer, Navbar } from "components";
import { isEventValid, formatLanguage } from "utils";
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
  location: { search, origin, pathname },
}) => {
  const classes = useStyles();

  const [loading, setLoading] = React.useState(false);
  const [stripe, setStripe] = React.useState<Stripe>();
  const [ticketsModalOpen, setTicketsModalOpen] = React.useState(false);

  // console.log({
  //   title,
  //   subtitle,
  //   description,
  //   image,
  //   video,
  //   date,
  //   duration,
  //   language,
  //   isOnline,
  //   location,
  //   tickets,
  // });

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
    if (min === max) return `$${min}`;
    return `$${min} - $${max}`;
  };

  // const toggleTicketsModal = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await fetch(`/.netlify/functions/checkout`, {
  //       method: "POST",
  //       body: JSON.stringify({
  //         ticketId: "price_1IDMEYG9T6XK0FGiV7ZXA2EI",
  //         redirectUrl: `${origin}${pathname}`,
  //       }),
  //     });
  //     const session = await res.json();

  //     const result = await stripe.redirectToCheckout({
  //       sessionId: session.id,
  //     });

  //     if (result.error) {
  //       throw result.error;
  //     }
  //   } catch (err) {
  //     enqueueSnackbar("Something went wrong. Please try again later.", {
  //       variant: "error",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const prepareStripe = async () => {
  //   const newStripe = await stripePromise;
  //   setStripe(newStripe);
  // };

  const alreadyPurchased = React.useMemo(() => {
    if (search) {
      const params = new URLSearchParams(search);
      if (params.get("success") === "true") {
        return true;
      }
    }
    return false;
  }, [search]);

  const isTicketValid = ({ endsOn }: TicketType) => {
    const now = moment();
    const { date } = event;

    if (endsOn === "oneWeek") {
      return now.add(1, "week").isBefore(date);
    }
    if (endsOn === "startOfDay") {
      return now.isBefore(moment(date).startOf("day"));
    }
    if (endsOn === "startOfEvent") {
      return now.isBefore(date);
    }
    return false;
  };

  // React.useEffect(() => {
  //   const body = document.body;
  //   if (loading) {
  //     body.style.overflowY = "hidden";
  //   } else {
  //     body.style.overflowY = "auto";
  //   }
  // }, [loading]);

  // React.useEffect(() => {
  //   prepareStripe();
  // }, []);

  return (
    <EventContext.Provider
      value={{
        event,
        alreadyPurchased,
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
