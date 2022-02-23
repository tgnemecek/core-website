import React from "react";
import { isBefore } from "date-fns";
import { Container } from "@material-ui/core";
import { Section, HorizontalFeed, Heading } from "components";
import { usePostFeed } from "utils";
import { Post } from "types";
import PostCard from "./PostCard";

type PostsSectionProps = {
  filter?: (post: Post) => boolean;
};

const PostsSection: React.FC<PostsSectionProps> = ({ filter }) => {
  const { posts: unfilteredPosts, heading, subheading } = usePostFeed();

  const posts = unfilteredPosts.filter(filter || Boolean);

  const sorter = ({ date: dateA }: Post, { date: dateB }: Post) => {
    if (isBefore(dateA, dateB)) {
      return 1;
    }

    return -1;
  };

  if (!posts.length) return null;

  return (
    <Section id="posts">
      <Container>
        <Heading showLine subheading={subheading}>
          {heading}
        </Heading>
      </Container>
      <Container>
        <HorizontalFeed
          items={[...posts].sort(sorter).map((post, i) => (
            <PostCard key={i} post={post} />
          ))}
        />
      </Container>
    </Section>
  );
};

export default PostsSection;
