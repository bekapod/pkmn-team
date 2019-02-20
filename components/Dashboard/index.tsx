import Link from "next/link";
import React, { Fragment } from "react";
import { ITeam } from "../../types";
import CenteredRow from "../CenteredRow";
import { CtaInternalLink } from "../Cta";
import TeamCard from "../TeamCard";
import TeamGrid from "../TeamGrid";

interface IProps {
  teams?: ITeam[];
}

const Dashboard = ({ teams }: IProps) => (
  <Fragment>
    <CenteredRow>
      <Link href="/team/create/" passHref={true}>
        <CtaInternalLink>Create a team</CtaInternalLink>
      </Link>
    </CenteredRow>
    {teams && (
      <TeamGrid>
        {teams.map(team => (
          <TeamCard key={`Team: ${team.id}`} team={team} />
        ))}
      </TeamGrid>
    )}
  </Fragment>
);

export default Dashboard;
