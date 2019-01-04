// @flow
import React, { Fragment } from "react";
import TeamCard from "../TeamCard";
import Heading from "../Heading";
import SectionContainer from "../SectionContainer";
import CenteredRow from "../CenteredRow";
import TeamGrid from "../TeamGrid";
import { CtaInternalLink } from "../Cta";
import type { Team } from "../../types";

type Props = {
  teams: Array<Team>,
  loading: boolean
};

const Dashboard = ({ teams, loading }: Props) => (
  <Fragment>
    <Heading>My Teams</Heading>
    <SectionContainer>
      <CenteredRow>
        <CtaInternalLink to="/team/create/">Create a team</CtaInternalLink>
      </CenteredRow>
      {!loading && (
        <TeamGrid>
          {teams.map(team => (
            <TeamCard key={`Team: ${team.id}`} team={team} />
          ))}
        </TeamGrid>
      )}
    </SectionContainer>
  </Fragment>
);

export default Dashboard;
