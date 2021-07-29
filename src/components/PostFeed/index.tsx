import React from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";
import { Section, HorizontalFeed } from "components";
import { usePostFeed } from "utils";
import { Post } from "types";
import PostCard from "./PostCard";

type PostFeedProps = {
  title: string;
  filter?: (post: Post) => boolean;
};

const PostFeed: React.FC<PostFeedProps> = ({ title, filter }) => {
  const posts = usePostFeed().filter(filter || Boolean);

  const classes = useStyles();

  const sorter = ({ date: dateA }: Post, { date: dateB }: Post) => {
    const momentA = moment(dateA);
    const momentB = moment(dateB);

    if (momentA.isBefore(momentB)) {
      return -1;
    }
    return 1;
  };

  if (!posts.length) return null;

  return (
    <Section id="posts">
      <Container>
        <Typography variant="h2" className={classes.heading}>
          What's new
        </Typography>
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

const useStyles = makeStyles((theme) => ({
  heading: {
    marginBottom: 32,
  },
}));
