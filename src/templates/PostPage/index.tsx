import React from "react";
import { graphql, PageProps } from "gatsby";
import { PostPageDTO } from "types";
import {
  Hero,
  Layout,
  Footer,
  Navbar,
  Section,
  PostsSection,
} from "components";
import { usePostImage, recursivelyFormatDate } from "utils";
import { Body, Video, BackLink } from "./sections";

type PostPageWithLocation = PostPageDTO & {
  location: PageProps["location"];
};

const PostPage: React.FC<PostPageWithLocation> = ({
  data: {
    markdownRemark: {
      fields: { slug, post },
    },
  },
}) => {
  const { title, text, video, date } = recursivelyFormatDate(post);

  const postImage = usePostImage(post);

  return (
    <Layout>
      <Navbar />
      <main>
        <Hero title={title} small image={postImage} />
        <Section>
          <Body title={title} body={text} date={date} />
          {video && <Video video={video} />}
          <BackLink />
        </Section>
        <PostsSection filter={(post) => post.slug !== slug} />
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
        post {
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
