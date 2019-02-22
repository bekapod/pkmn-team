import { anyPass, isEmpty, isNil, set, unset } from "lodash/fp";
import { TeamMember } from "../../types";

interface State {
  teamName?: string;
  teamMembers?: TeamMember[];
  isValid: boolean;
  isTouched: boolean;
  errors: { [key: string]: string };
}

export const validate = (
  state: State,
  options: { setTouched?: boolean } = {}
): State => {
  const { teamName, teamMembers } = state;
  const isInvalid = anyPass([isEmpty, isNil]);
  let updatedState = { ...state };

  if (options.setTouched) {
    updatedState = set("isTouched", true, updatedState);
  }

  updatedState =
    isInvalid(teamName) || isInvalid(teamMembers)
      ? set("isValid", false, updatedState)
      : set("isValid", true, updatedState);

  if (isInvalid(teamName)) {
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

  if (isInvalid(teamMembers)) {
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
