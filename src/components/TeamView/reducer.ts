import { Dispatch, useReducer } from 'react';
import isEqual from 'react-fast-compare';
import { Team_Member } from '~/generated/graphql';
import { reorder } from './helpers';

export enum TeamMemberActionType {
  AddTeamMember = 'add_team_member',
  RemoveTeamMember = 'remove_team_member',
  ReorderTeamMember = 'reorder_team_member',
  ResetTeamMembers = 'reset_team_members'
}

type AddTeamMemberAction = {
  type: TeamMemberActionType.AddTeamMember;
  payload: Team_Member;
};

type RemoveTeamMemberAction = {
  type: TeamMemberActionType.RemoveTeamMember;
  payload: Team_Member;
};

type ReorderTeamMemberAction = {
  type: TeamMemberActionType.ReorderTeamMember;
  payload: {
    sourceIndex: number;
    destinationIndex: number;
  };
};

type ResetTeamMembersAction = {
  type: TeamMemberActionType.ResetTeamMembers;
  payload: Team_Member[];
};

type Action =
  | AddTeamMemberAction
  | RemoveTeamMemberAction
  | ReorderTeamMemberAction
  | ResetTeamMembersAction;

const reducer = (state: Team_Member[], action: Action) => {
  switch (action.type) {
    case TeamMemberActionType.AddTeamMember:
      return [...state, action.payload];
    case TeamMemberActionType.RemoveTeamMember:
      return state.filter(({ id }) => id !== action.payload.id);
    case TeamMemberActionType.ReorderTeamMember:
      return reorder(
        state,
        action.payload.sourceIndex,
        action.payload.destinationIndex
      ).map((member, index) => ({
        ...member,
        order: index + 1
      }));
    case TeamMemberActionType.ResetTeamMembers:
      return isEqual(state, action.payload) ? state : action.payload;
    default:
      return state;
  }
};

export function useTeamMembersReducer(
  teamMembers: Team_Member[]
): [Team_Member[], Dispatch<Action>] {
  return useReducer(reducer, teamMembers);
}
