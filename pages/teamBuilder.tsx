import React, { Component } from "react";
import Page from "../components/Page";
import TeamBuilder from "../containers/TeamBuilder";

interface IProps {
  query: {
    teamId?: string;
  };
}

export default class extends Component<IProps> {
  public render() {
    const { query } = this.props;

    return (
      <Page title={query.teamId ? "Edit Team" : "Create Team"}>
        <TeamBuilder query={query} />
      </Page>
    );
  }
}
