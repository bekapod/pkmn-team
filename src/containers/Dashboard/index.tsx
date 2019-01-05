import React from "react";
import { Query } from "react-apollo";
import { getAllTeams } from "../../queries/team";
import Dashboard from "../../components/Dashboard";
import { Team } from "../../types";

const DashboardContainer = () => (
  <Query query={getAllTeams}>
    {({ data, loading /* , error */ }) => (
      <Dashboard teams={data.allTeams} loading={loading} />
    )}
  </Query>
);

export default DashboardContainer;
