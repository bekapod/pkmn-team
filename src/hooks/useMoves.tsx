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
  PokemonMoveFragment,
  TeamMemberFragment,
  TeamMemberMoveFragment
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
  payload: PokemonMoveFragment;
};

type RemoveMoveAction = {
  type: MoveActionType.RemoveMove;
  payload: TeamMemberMoveFragment;
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
  payload: TeamMemberMoveFragment[];
};

export type Action =
  | AddMoveAction
  | RemoveMoveAction
  | ReorderMoveAction
  | ResetMovesAction;

const reducer = (state: TeamMemberMoveFragment[], action: Action) => {
  switch (action.type) {
    case MoveActionType.AddMove:
      return [...state, action.payload as TeamMemberMoveFragment];
    case MoveActionType.RemoveMove:
      return state.filter(({ node }) => node?.id !== action.payload.node?.id);
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
  moves: TeamMemberMoveFragment[]
): [TeamMemberMoveFragment[], Dispatch<Action>] => {
  return useReducer(reducer, moves);
};

const MovesContext = createContext<
  [TeamMemberMoveFragment[], Dispatch<Action>]
>([
  [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => {}
]);

export const useMoves = (): [TeamMemberMoveFragment[], Dispatch<Action>] => {
  const context = useContext(MovesContext);
  if (!context) {
    throw new Error(
      `useTeamMemberMoves must be used within a TeamMemberMovesProvider`
    );
  }
  return context;
};

export const MovesProvider: FunctionComponent<{
  teamMember?: TeamMemberFragment;
  updateTeamMemberMoves?: (
    member: TeamMemberFragment,
    moves: TeamMemberMoveFragment[]
  ) => void;
}> = ({ teamMember, updateTeamMemberMoves, ...props }) => {
  const isInitialValue = useRef(true);
  const [moves, dispatch] = useMovesReducer(
    teamMember?.moves?.edges?.filter(
      (edge): edge is TeamMemberMoveFragment => !!edge
    ) ?? []
  );
  const value = useMemo<[TeamMemberMoveFragment[], Dispatch<Action>]>(
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
      payload:
        teamMember?.moves?.edges?.filter(
          (edge): edge is TeamMemberMoveFragment => !!edge
        ) ?? []
    });
  }, [teamMember?.moves?.edges ?? []]);

  return <MovesContext.Provider value={value} {...props} />;
};
