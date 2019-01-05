import React from "react";
import { Query } from "react-apollo";
import Dashboard from "../../components/Dashboard";
import { getAllTeams } from "../../queries/team";

const DashboardContainer = () => (
  <Query query={getAllTeams}>
    {({ data, loading /* , error */ }) => (
      <Dashboard teams={data.allTeams} loading={loading} />
    )}
  </Query>
);

export default DashboardContainer;
