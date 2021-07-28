import React from "react";
import moment from "moment";
import { Container, Typography, IconButton } from "@material-ui/core";
import { Section, HorizontalFeed } from "components";
// import { usePostFeed } from "utils";
import { PostFeedType } from "types";
import Post from "./Post";

type PostFeedProps = {
  title: string;
  filter?: (post: PostFeedType) => boolean;
};

const PostFeed: React.FC<any> = ({ title, filter }) => {
  // const posts = usePostFeed().filter(filter || Boolean);

  const posts = [];

  const sorter = (
    { date: dateA }: PostFeedType,
    { date: dateB }: PostFeedType
  ) => {
    const now = moment();
    const momentA = moment(dateA);
    const momentB = moment(dateB);

    let aIsPast = false;
    let bIsPast = false;

    if (momentA.isBefore(now)) aIsPast = true;
    if (momentB.isBefore(now)) bIsPast = true;

    if (aIsPast && bIsPast) {
      if (momentA.isAfter(momentB)) return -1;
      return 1;
    }
    if (!aIsPast && !bIsPast) {
      if (momentA.isAfter(momentB)) return 1;
      return -1;
    }

    if (bIsPast) return -1;
    return 1;
  };

  if (!posts.length) return null;

  // return (
  //   <Section id="posts">
  //     <Container>
  //       <Typography variant="h2">{title}</Typography>
  //       <Typography variant="subtitle1" component="p">
  //         Latest updates about our online and in person posts
  //       </Typography>
  //     </Container>
  //     <Container>
  //       <HorizontalFeed
  //         items={[...posts].sort(sorter).map((post, i) => (
  //           <Post key={i} post={post} />
  //         ))}
  //       />
  //     </Container>
  //   </Section>
  // );
};

export default PostFeed;
