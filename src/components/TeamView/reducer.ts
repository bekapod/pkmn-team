import { Dispatch, useReducer } from 'react';
import isEqual from 'react-fast-compare';
import {
  TeamMemberFragment,
  TeamMemberInTeamFragment
} from '~/generated/graphql';
import { reorder } from '~/lib/general';

export enum TeamMemberActionType {
  AddTeamMember = 'add_team_member',
  RemoveTeamMember = 'remove_team_member',
  ReorderTeamMember = 'reorder_team_member',
  ResetTeamMembers = 'reset_team_members'
}

type AddTeamMemberAction = {
  type: TeamMemberActionType.AddTeamMember;
  payload: Omit<TeamMemberFragment, 'id'>;
};

type RemoveTeamMemberAction = {
  type: TeamMemberActionType.RemoveTeamMember;
  payload: TeamMemberInTeamFragment;
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
  payload: TeamMemberInTeamFragment[];
};

type Action =
  | AddTeamMemberAction
  | RemoveTeamMemberAction
  | ReorderTeamMemberAction
  | ResetTeamMembersAction;

const reducer = (state: TeamMemberInTeamFragment[], action: Action) => {
  switch (action.type) {
    case TeamMemberActionType.AddTeamMember:
      return [
        ...state,
        {
          node: action.payload,
          slot: state.length + 1
        } as TeamMemberInTeamFragment
      ];
    case TeamMemberActionType.RemoveTeamMember:
      return state.filter(
        member => member.node?.id !== action.payload.node?.id
      );
    case TeamMemberActionType.ReorderTeamMember:
      return reorder(
        state,
        action.payload.sourceIndex,
        action.payload.destinationIndex
      ).map((member, index) => ({
        ...member,
        slot: index + 1
      }));
    case TeamMemberActionType.ResetTeamMembers:
      return isEqual(state, action.payload) ? state : action.payload;
    default:
      return state;
  }
};

export function useTeamMembersReducer(
  teamMembers: TeamMemberInTeamFragment[]
): [TeamMemberInTeamFragment[], Dispatch<Action>] {
  return useReducer(reducer, teamMembers);
}
