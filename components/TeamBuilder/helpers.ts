import { anyPass, isEmpty, isNil, set, unset } from "lodash/fp";
import { ITeamMember } from "../../types";

export const validate = (
  props: {
    teamBuilderName?: string;
    teamBuilderMembers?: ITeamMember[];
  },
  state: {
    isValid: boolean;
    isTouched: boolean;
    errors: { [key: string]: string };
  },
  options: { setTouched?: boolean } = {}
) => {
  const { teamBuilderName, teamBuilderMembers } = props;
  const isInvalid = anyPass([isEmpty, isNil]);
  let updatedState = { ...state };

  if (options.setTouched) {
    updatedState = set("isTouched", true, updatedState);
  }

  updatedState =
    isInvalid(teamBuilderName) || isInvalid(teamBuilderMembers)
      ? set("isValid", false, updatedState)
      : set("isValid", true, updatedState);

  if (isInvalid(teamBuilderName)) {
    updatedState = set(
      "errors",
      { ...updatedState.errors, name: "Team name is required" },
      updatedState
    );
  } else {
    updatedState = set(
      "errors",
      unset("name", updatedState.errors),
      updatedState
    );
  }

  if (isInvalid(teamBuilderMembers)) {
    updatedState = set(
      "errors",
      { ...updatedState.errors, members: "Your team must have some pokemon" },
      updatedState
    );
  } else {
    updatedState = set(
      "errors",
      unset("members", updatedState.errors),
      updatedState
    );
  }

  return updatedState;
};
