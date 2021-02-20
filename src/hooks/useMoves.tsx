import {
  Dispatch,
  useReducer,
  createContext,
  useContext,
  FunctionComponent,
  useMemo,
  useEffect,
  useRef
} from 'react';
import isEqual from 'react-fast-compare';
import useDeepCompareEffect from 'use-deep-compare-effect';
import {
  MoveFragmentFragment,
  TeamMemberFragmentFragment
} from '~/generated/graphql';
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
      );
    case MoveActionType.ResetMoves:
      return isEqual(state, action.payload) ? state : action.payload;
    default:
      return state;
  }
};

const useMovesReducer = (
  moves: MoveFragmentFragment[]
): [MoveFragmentFragment[], Dispatch<Action>] => {
  return useReducer(reducer, moves);
};

const MovesContext = createContext<[MoveFragmentFragment[], Dispatch<Action>]>([
  [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => {}
]);

export const useMoves = (): [MoveFragmentFragment[], Dispatch<Action>] => {
  const context = useContext(MovesContext);
  if (!context) {
    throw new Error(
      `useTeamMemberMoves must be used within a TeamMemberMovesProvider`
    );
  }
  return context;
};

export const MovesProvider: FunctionComponent<{
  teamMember?: TeamMemberFragmentFragment;
  updateTeamMemberMoves?: (
    member: TeamMemberFragmentFragment,
    moves: MoveFragmentFragment[]
  ) => void;
}> = ({ teamMember, updateTeamMemberMoves, ...props }) => {
  const isInitialValue = useRef(true);
  const [moves, dispatch] = useMovesReducer(
    teamMember?.learned_moves?.map(({ move }) => move) ?? []
  );
  const value = useMemo<[MoveFragmentFragment[], Dispatch<Action>]>(
    () => [moves, dispatch],
    [moves, dispatch]
  );

  useEffect(() => {
    if (!isInitialValue.current && teamMember) {
      updateTeamMemberMoves?.(teamMember, moves);
    }

    isInitialValue.current = false;
  }, [teamMember, moves, updateTeamMemberMoves]);

  useDeepCompareEffect(() => {
    dispatch({
      type: MoveActionType.ResetMoves,
      payload: teamMember?.learned_moves.map(({ move }) => move) ?? []
    });
  }, [teamMember?.learned_moves]);

  return <MovesContext.Provider value={value} {...props} />;
};
