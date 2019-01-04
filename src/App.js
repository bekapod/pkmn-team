// @flow
import React from "react";
import { Switch, Route } from "react-router-dom";
import DashboardContainer from "./containers/Dashboard";
import TeamBuilderContainer from "./containers/TeamBuilder";

const App = () => (
  <Switch>
    <Route exact path="/" component={DashboardContainer} />
    <Route path="/team/create/" component={TeamBuilderContainer} />
  </Switch>
);

export default App;
