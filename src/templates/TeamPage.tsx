import React from "react";
import { Hero, Team, Layout, Navbar, Footer } from "components";
import { useTeamPage } from "utils";

const TeamPage: React.FC = () => {
  const { hero, members } = useTeamPage();

  return (
    <Layout>
      <Navbar />
      <main>
        <Hero hero={hero} small />
        <Team members={members} />
      </main>
      <Footer />
    </Layout>
  );
};

export default TeamPage;
