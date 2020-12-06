import React from "react";
import { Container, Grid } from "@material-ui/core";
import { Section } from "components";
import Member from "./Member";
import MemberModal from "./MemberModal";
import { MemberType } from "./types";

type TeamProps = {
  members: MemberType[];
};

const Team: React.FC<TeamProps> = ({ members }) => {
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
                  setMemberToView={(idx) => setMemberToView(members[idx])}
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
