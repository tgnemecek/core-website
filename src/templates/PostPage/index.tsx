import React from "react";
import { graphql, PageProps } from "gatsby";
import { PostPageDTO } from "types";
import { Hero, Layout, Footer, Navbar, Section, PostFeed } from "components";
import { Body, Video, BackLink } from "./sections";

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
  const { title, text, image, video, date } = post;

  return (
    <Layout>
      <Navbar />
      <main>
        <Hero title={title} small image={image} />
        <Section>
          <Body title={title} body={text} date={date} />
          {video && <Video video={video} />}
          <BackLink />
        </Section>
        <PostFeed title="Learn more" filter={(post) => post.slug !== slug} />
      </main>
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
          title
          text
          image
          video
          date
        }
      }
    }
  }
`;
