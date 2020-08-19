import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Button, Grid, Modal } from "@material-ui/core";
import Section from "components/Section";
import { Link } from "gatsby";
import { theme } from "components/theme";
import Member from "./Member";
import MemberModal from "./MemberModal";

const TEMP_DATA = [
  {
    name: "John Mark",
    role: "CEO & Founder",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/4/48/Outdoors-man-portrait_%28cropped%29.jpg",
    video: "https://www.youtube.com/watch?v=wGMv6kxZgUw",
    bio:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    name: "Kate Gordon",
    role: "CEO & Founder",
    photo:
      "https://assets.entrepreneur.com/content/3x2/2000/20190911203533-ent19-octnov-100women.jpeg",
    video: "https://www.youtube.com/watch?v=wGMv6kxZgUw",
    bio:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    name: "Penelope Kennedy",
    role: "Vice President",
    photo:
      "https://cdn.pixabay.com/photo/2017/08/30/17/27/business-woman-2697954_1280.jpg",
    video: "https://www.youtube.com/watch?v=wGMv6kxZgUw",
    bio:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    name: "Philip Henry",
    role: "Vice President",
    photo:
      "https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/04/08/16/gettyimages-651958742.jpg?w968h681",
    video: "https://www.youtube.com/watch?v=wGMv6kxZgUw",
    bio:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    name: "Julia Johnson",
    role: "Marketing Lead",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    video: "https://www.youtube.com/watch?v=wGMv6kxZgUw",
    bio:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    name: "Good Doggo",
    role: "Just Dog",
    photo:
      "https://images.fineartamerica.com/images-medium-large-5/mature-golden-retriever-dog-portrait-animal-images.jpg",
    video: "https://www.youtube.com/watch?v=wGMv6kxZgUw",
    bio:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

const Team = ({ members }) => {
  const [memberToView, setMemberToView] = React.useState(null);

  return (
    <Section>
      <Container>
        <Grid container spacing={3}>
          {members.map((member, i) => {
            return (
              <Grid item key={i} xs={12} sm={6} md={4}>
                <Member
                  {...member}
                  idx={i}
                  setMemberToView={(idx) => setMemberToView(TEMP_DATA[idx])}
                  delay={i * 100}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
      {memberToView && (
        <MemberModal
          memberToView={memberToView}
          onClose={() => setMemberToView(null)}
        />
      )}
    </Section>
  );
};

export default Team;
