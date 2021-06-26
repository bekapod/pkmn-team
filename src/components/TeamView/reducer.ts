import { Dispatch, useReducer } from 'react';
import isEqual from 'react-fast-compare';
import { PokemonFragment, TeamMemberFragment } from '~/generated/graphql';
import { reorder } from '~/lib/general';

export enum TeamMemberActionType {
  AddTeamMember = 'add_team_member',
  RemoveTeamMember = 'remove_team_member',
  ReorderTeamMember = 'reorder_team_member',
  ResetTeamMembers = 'reset_team_members'
}

type AddTeamMemberAction = {
  type: TeamMemberActionType.AddTeamMember;
  payload: Omit<TeamMemberFragment, 'pokemon' | 'moves'> & {
    pokemon: Omit<
      PokemonFragment,
      'moves' | 'eggGroups' | 'evolvesTo' | 'evolvesFrom'
    >;
  };
};

type RemoveTeamMemberAction = {
  type: TeamMemberActionType.RemoveTeamMember;
  payload: TeamMemberFragment;
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
  payload: TeamMemberFragment[];
};

type Action =
  | AddTeamMemberAction
  | RemoveTeamMemberAction
  | ReorderTeamMemberAction
  | ResetTeamMembersAction;

const reducer = (state: TeamMemberFragment[], action: Action) => {
  switch (action.type) {
    case TeamMemberActionType.AddTeamMember:
      return [...state, action.payload as TeamMemberFragment];
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
  teamMembers: TeamMemberFragment[]
): [TeamMemberFragment[], Dispatch<Action>] {
  return useReducer(reducer, teamMembers);
}
