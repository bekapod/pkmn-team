import { compose, get, values } from "lodash/fp";
import { createSelector } from "reselect";

export const getTeamBuilder = get("teamBuilder");

export const getTeamBuilderName = createSelector(
  getTeamBuilder,
  get("name")
);

export const getTeamBuilderMembers = createSelector(
  getTeamBuilder,
  compose(
    values,
    get("members")
  )
);
