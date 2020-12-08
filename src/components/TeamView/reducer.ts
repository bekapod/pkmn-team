import { Dispatch, useReducer } from 'react';
import { TeamMember } from '~/generated/graphql';
import { reorder } from './helpers';

export enum TeamMemberActionType {
  AddTeamMember = 'add_team_member',
  RemoveTeamMember = 'remove_team_member',
  ReorderTeamMember = 'reorder_team_member'
}

type AddTeamMemberAction = {
  type: TeamMemberActionType.AddTeamMember;
  payload: TeamMember;
};

type RemoveTeamMemberAction = {
  type: TeamMemberActionType.RemoveTeamMember;
  payload: TeamMember;
};

type ReorderTeamMember = {
  type: TeamMemberActionType.ReorderTeamMember;
  payload: {
    sourceIndex: number;
    destinationIndex: number;
  };
};

type Action = AddTeamMemberAction | RemoveTeamMemberAction | ReorderTeamMember;

const reducer = (state: TeamMember[], action: Action) => {
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
    default:
      return state;
  }
};

export function useTeamMembersReducer(
  teamMembers: TeamMember[]
): [TeamMember[], Dispatch<Action>] {
  return useReducer(reducer, teamMembers);
}
