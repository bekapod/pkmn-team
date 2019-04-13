import React from "react";
import Page from "../components/Page";
import TeamBuilder from "../containers/TeamBuilder";

interface Props {
  query: {
    teamId?: string;
  };
}

export default ({ query }: Props): JSX.Element => (
  <Page title={query.teamId ? "Edit Team" : "Create Team"}>
    <TeamBuilder query={query} />
  </Page>
);
