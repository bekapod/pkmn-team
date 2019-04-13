import { getOr } from "lodash/fp";
import React from "react";
import { Query } from "react-apollo";
import Dashboard from "../../components/Dashboard";
import { getAllTeams } from "../../queries/team";

const DashboardContainer = (): JSX.Element => (
  <Query query={getAllTeams}>
    {({ data /* , loading, error */ }): JSX.Element => (
      <Dashboard teams={getOr([], "teams", data)} />
    )}
  </Query>
);

export default DashboardContainer;
