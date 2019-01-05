import React from "react";
import { Route, Switch } from "react-router-dom";
import DashboardContainer from "./containers/Dashboard";
import TeamBuilderContainer from "./containers/TeamBuilder";

const App = () => (
  <Switch>
    <Route exact={true} path="/" component={DashboardContainer} />
    <Route path="/team/create/" component={TeamBuilderContainer} />
  </Switch>
);

export default App;
