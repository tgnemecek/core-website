import React from "react";
import moment from "moment";
import { Container } from "@material-ui/core";
import { Section, HorizontalFeed, Heading } from "components";
import { usePostFeed } from "utils";
import { Post } from "types";
import PostCard from "./PostCard";

type PostFeedProps = {
  title: string;
  filter?: (post: Post) => boolean;
};

const PostFeed: React.FC<PostFeedProps> = ({ title, filter }) => {
  const posts = usePostFeed().filter(filter || Boolean);

  const sorter = ({ date: dateA }: Post, { date: dateB }: Post) => {
    const momentA = moment(dateA);
    const momentB = moment(dateB);

    if (momentA.isBefore(momentB)) {
      return 1;
    }
    return -1;
  };

  if (!posts.length) return null;

  return (
    <Section id="posts">
      <Container>
        <Heading
          showLine
          subheading="Keep updated with our latest posts and news"
        >
          {title}
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

export default PostFeed;
