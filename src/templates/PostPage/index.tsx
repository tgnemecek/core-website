import React from "react";
import { graphql, PageProps } from "gatsby";
import { PostPageDTO } from "types";
import { Hero, Layout, Footer, Navbar } from "components";
import { Body } from "./sections";

type PostPageWithLocation = PostPageDTO & {
  location: PageProps["location"];
};

const PostPage: React.FC<PostPageWithLocation> = ({
  data: {
    markdownRemark: {
      fields: { slug },
      frontmatter: { posts: post },
    },
  },
}) => {
  const { title, body, image, video, date } = post;
  console.log({ post });

  return (
    <Layout>
      <Navbar />
      <main>
        <Hero title={title} small />
        <Body body={body} />
      </main>
      {/* <main>
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
        {ticketsModalOpen && <TicketsModal open />} */}
      <Footer paddingBottom={70} />
    </Layout>
  );
};

export default PostPage;

export const pageQuery = graphql`
  query PostQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      fields {
        slug
      }
      frontmatter {
        posts {
          id
          title
          body
          image
          video
          date
        }
      }
    }
  }
`;
