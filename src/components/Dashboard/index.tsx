import React, { Fragment } from "react";
import { ITeam } from "../../types";
import CenteredRow from "../CenteredRow";
import { CtaInternalLink } from "../Cta";
import Heading from "../Heading";
import SectionContainer from "../SectionContainer";
import TeamCard from "../TeamCard";
import TeamGrid from "../TeamGrid";

interface IProps {
  teams?: ITeam[];
  loading?: boolean;
}

const Dashboard = ({ teams, loading }: IProps) => (
  <Fragment>
    <Heading>My Teams</Heading>
    <SectionContainer>
      <CenteredRow>
        <CtaInternalLink to="/team/create/">Create a team</CtaInternalLink>
      </CenteredRow>
      {!loading && teams && (
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
