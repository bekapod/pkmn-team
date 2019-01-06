import { getOr } from "lodash/fp";
import React from "react";
import { Query } from "react-apollo";
import Dashboard from "../../components/Dashboard";
import Page from "../../components/Page";
import { getAllTeams } from "../../queries/team";

const DashboardContainer = () => (
  <Query query={getAllTeams}>
    {({ data, loading, error }) => (
      <Page title="My Teams" loading={loading} error={error}>
        <Dashboard teams={getOr([], "allTeams", data)} />
      </Page>
    )}
  </Query>
);

export default DashboardContainer;
