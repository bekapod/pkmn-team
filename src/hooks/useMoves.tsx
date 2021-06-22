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
  TeamMemberFragmentFragment,
  TeamMemberMoveFragmentFragment
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
  payload: TeamMemberMoveFragmentFragment['move'];
};

type RemoveMoveAction = {
  type: MoveActionType.RemoveMove;
  payload: TeamMemberMoveFragmentFragment['move'];
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
  payload: TeamMemberMoveFragmentFragment['move'][];
};

export type Action =
  | AddMoveAction
  | RemoveMoveAction
  | ReorderMoveAction
  | ResetMovesAction;

const reducer = (
  state: TeamMemberMoveFragmentFragment['move'][],
  action: Action
) => {
  switch (action.type) {
    case MoveActionType.AddMove:
      return [...state, action.payload];
    case MoveActionType.RemoveMove:
      return state.filter(({ move: { id } }) => id !== action.payload.move.id);
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
  moves: TeamMemberMoveFragmentFragment['move'][]
): [TeamMemberMoveFragmentFragment['move'][], Dispatch<Action>] => {
  return useReducer(reducer, moves);
};

const MovesContext = createContext<
  [TeamMemberMoveFragmentFragment['move'][], Dispatch<Action>]
>([
  [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => {}
]);

export const useMoves = (): [
  TeamMemberMoveFragmentFragment['move'][],
  Dispatch<Action>
] => {
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
    moves: TeamMemberMoveFragmentFragment['move'][]
  ) => void;
}> = ({ teamMember, updateTeamMemberMoves, ...props }) => {
  const isInitialValue = useRef(true);
  const [moves, dispatch] = useMovesReducer(
    teamMember?.moves?.teamMemberMoves?.map(({ move }) => move) ?? []
  );
  const value = useMemo<
    [TeamMemberMoveFragmentFragment['move'][], Dispatch<Action>]
  >(() => [moves, dispatch], [moves, dispatch]);

  useEffect(() => {
    if (!isInitialValue.current && teamMember) {
      updateTeamMemberMoves?.(teamMember, moves);
    }

    isInitialValue.current = false;
  }, [teamMember, moves, updateTeamMemberMoves]);

  useDeepCompareEffect(() => {
    dispatch({
      type: MoveActionType.ResetMoves,
      payload: teamMember?.moves?.teamMemberMoves?.map(({ move }) => move) ?? []
    });
  }, [teamMember?.moves?.teamMemberMoves ?? []]);

  return <MovesContext.Provider value={value} {...props} />;
};
