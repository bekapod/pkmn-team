// @flow
import React from "react";
import { Query } from "react-apollo";
import { getAllTeams } from "../../queries/team";
import Dashboard from "../../components/Dashboard";
import type { Team } from "../../types";

/* eslint-disable react/no-unused-prop-types */
type Response = {
  data: {
    allTeams: Array<Team>
  },
  loading: boolean
};

const DashboardContainer = () => (
  <Query query={getAllTeams}>
    {({ data, loading /* , error */ }: Response) => (
      <Dashboard teams={data.allTeams} loading={loading} />
    )}
  </Query>
);

export default DashboardContainer;
