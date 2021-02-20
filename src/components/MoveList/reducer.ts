import { Dispatch, useReducer } from 'react';
import isEqual from 'react-fast-compare';
import { MoveFragmentFragment } from '~/generated/graphql';
import { reorder } from '~/lib/general';

export enum MoveActionType {
  AddMove = 'add_move',
  RemoveMove = 'remove_move',
  ReorderMove = 'reorder_move',
  ResetMoves = 'reset_moves'
}

type AddMoveAction = {
  type: MoveActionType.AddMove;
  payload: MoveFragmentFragment;
};

type RemoveMoveAction = {
  type: MoveActionType.RemoveMove;
  payload: MoveFragmentFragment;
};

type ReorderMoveAction = {
  type: MoveActionType.ReorderMove;
  payload: {
    sourceIndex: number;
    destinationIndex: number;
  };
};

type ResetMovesAction = {
  type: MoveActionType.ResetMoves;
  payload: MoveFragmentFragment[];
};

export type Action =
  | AddMoveAction
  | RemoveMoveAction
  | ReorderMoveAction
  | ResetMovesAction;

const reducer = (state: MoveFragmentFragment[], action: Action) => {
  switch (action.type) {
    case MoveActionType.AddMove:
      return [...state, action.payload];
    case MoveActionType.RemoveMove:
      return state.filter(({ id }) => id !== action.payload.id);
    case MoveActionType.ReorderMove:
      return reorder(
        state,
        action.payload.sourceIndex,
        action.payload.destinationIndex
      ).map((member, index) => ({
        ...member,
        order: index + 1
      }));
    case MoveActionType.ResetMoves:
      return isEqual(state, action.payload) ? state : action.payload;
    default:
      return state;
  }
};

export function useMovesReducer(
  moves: MoveFragmentFragment[]
): [MoveFragmentFragment[], Dispatch<Action>] {
  return useReducer(reducer, moves);
}
