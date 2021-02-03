import React from "react";
import { graphql, PageProps } from "gatsby";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { useSnackbar, SnackbarProvider } from "notistack";
import { EventPageDTO } from "types";
import { Layout, EventFeed, Footer, Navbar } from "components";
import { Aside, FixedBar, Header, ContentGrid, Body, Video } from "./sections";
import { getEventStatus, formatLanguage } from "utils";

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLIC_KEY);

type EventPageWithLocation = EventPageDTO & {
  location: PageProps["location"];
};

const EventPage: React.FC<EventPageWithLocation> = ({
  data: {
    markdownRemark: {
      fields: { slug },
      frontmatter: { events },
    },
  },
  location: { search, origin, pathname },
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

  const [loading, setLoading] = React.useState(false);
  const [stripe, setStripe] = React.useState<Stripe>();

  const { enqueueSnackbar } = useSnackbar();

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
    if (min === max) return `$${min}`;
    return `$${min} - $${max}`;
  };

  const openCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/.netlify/functions/checkout`, {
        method: "POST",
        body: JSON.stringify({
          ticketId: "price_1IDMEYG9T6XK0FGiV7ZXA2EI",
          redirectUrl: `${origin}${pathname}`,
        }),
      });
      const session = await res.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw result.error;
      }
    } catch (err) {
      enqueueSnackbar("Something went wrong. Please try again later.", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const prepareStripe = async () => {
    const newStripe = await stripePromise;
    setStripe(newStripe);
  };

  const alreadyPurchased = React.useMemo(() => {
    if (search) {
      const params = new URLSearchParams(search);
      if (params.get("success") === "true") {
        return true;
      }
    }
    return false;
  }, [search]);

  React.useEffect(() => {
    const body = document.body;
    if (loading) {
      body.style.overflowY = "hidden";
    } else {
      body.style.overflowY = "auto";
    }
  }, [loading]);

  React.useEffect(() => {
    prepareStripe();
  }, []);

  return (
    <Layout>
      <Navbar />
      <main>
        <Header
          title={title}
          subtitle={subtitle}
          date={date}
          image={image}
          isOnline={isOnline}
          duration={duration}
          priceRange={getPriceRange()}
          isEventValid={getEventStatus({ tickets, date })}
          language={language}
        />
        <Video video={video} />
        {loading && (
          <Backdrop open={true} style={{ zIndex: 2000 }}>
            <CircularProgress />
          </Backdrop>
        )}
        <ContentGrid
          body={
            <Body title={title} subtitle={subtitle} description={description} />
          }
          aside={
            <Aside
              date={date}
              isOnline={isOnline}
              location={location}
              duration={duration}
              language={language}
              priceRange={getPriceRange()}
              openCheckout={openCheckout}
              alreadyPurchased={alreadyPurchased}
              loading={loading}
              isEventValid={getEventStatus({ tickets, date })}
            />
          }
        ></ContentGrid>
        <EventFeed
          title="You might also like these events"
          filter={(event) => event.slug !== slug}
        />
        <FixedBar
          openCheckout={openCheckout}
          isEventValid={getEventStatus({ tickets, date })}
          alreadyPurchased={alreadyPurchased}
          loading={loading}
        />
      </main>
      <Footer paddingBottom={70} />
    </Layout>
  );
};

const EventPageWithSnackbar: React.FC<EventPageWithLocation> = (props) => (
  <SnackbarProvider maxSnack={3}>
    <EventPage {...props} />
  </SnackbarProvider>
);

export default EventPageWithSnackbar;

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
