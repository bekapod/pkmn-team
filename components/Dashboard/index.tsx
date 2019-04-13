import Link from "next/link";
import React, { Fragment } from "react";
import { Team } from "../../types";
import CenteredRow from "../CenteredRow";
import { CtaInternalLink } from "../Cta";
import TeamCard from "../TeamCard";
import TeamGrid from "../TeamGrid";

interface Props {
  teams?: Team[];
}

const Dashboard = ({ teams }: Props): JSX.Element => (
  <Fragment>
    <CenteredRow>
      <Link href="/team/create/" passHref>
        <CtaInternalLink>Create a team</CtaInternalLink>
      </Link>
    </CenteredRow>
    {teams && (
      <TeamGrid>
        {teams.map(
          (team): JSX.Element => (
            <TeamCard key={`Team: ${team.id}`} team={team} />
          )
        )}
      </TeamGrid>
    )}
  </Fragment>
);

export default Dashboard;
