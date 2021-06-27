import { FunctionComponent, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { BiTrash as Trash } from 'react-icons/bi';
import type { CombinedError } from 'urql';
import { CenteredRow } from '../CenteredRow';
import { CtaButton } from '../Cta';
import { ErrorMessage } from '../ErrorMessage';
import { GiantInput } from '../GiantInput';
import { LoadingIcon } from '../LoadingIcon';
import { TeamView } from '../TeamView';
import { StickyBar } from '../StickyBar';
import {
  TeamByIdQuery,
  TeamMemberFragment,
  TeamMemberInTeamFragment,
  TeamMemberMoveFragment
} from '~/generated/graphql';
import { extractEdges } from '~/lib/relay';

export type TeamBuilderProps = {
  team?: TeamByIdQuery['teamById'];
  isLoading?: boolean;
  isSkeleton?: boolean;
  error?: CombinedError;
  updateTeam: (values: {
    name?: string;
    members?: TeamMemberInTeamFragment[];
  }) => void;
  deleteTeam: () => void;
  updateTeamMemberMoves: (values: {
    member: TeamMemberFragment;
    moves: TeamMemberMoveFragment[];
  }) => void;
};

export const TeamBuilder: FunctionComponent<TeamBuilderProps> = ({
  team,
  isLoading,
  isSkeleton,
  error,
  updateTeam,
  deleteTeam,
  updateTeamMemberMoves
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdateTeam = useCallback(
    debounce<TeamBuilderProps['updateTeam']>(
      nextValue => updateTeam(nextValue),
      1000
    ),
    [updateTeam]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdateTeamMemberMoves = useCallback(
    debounce<TeamBuilderProps['updateTeamMemberMoves']>(
      nextValue => updateTeamMemberMoves(nextValue),
      1000
    ),
    [updateTeamMemberMoves]
  );

  return (
    <>
      <StickyBar>
        {!isLoading && !isSkeleton ? (
          <CtaButton
            type="button"
            key="delete"
            size="small"
            variant="destructive"
            icon={Trash}
            onClick={deleteTeam}
          >
            Delete team
          </CtaButton>
        ) : null}

        {!!error && (
          <ErrorMessage color="var(--color-white)">
            {error.message}
          </ErrorMessage>
        )}

        {(isLoading || isSkeleton) && (
          <LoadingIcon key="Loading icon" isSpinner isSmall />
        )}
      </StickyBar>

      <CenteredRow stackVertically>
        <GiantInput
          aria-label="Choose a team name"
          placeholder="Choose a team name"
          defaultValue={team?.name}
          onChange={e => debouncedUpdateTeam({ name: e.currentTarget.value })}
          disabled={isSkeleton}
        />
      </CenteredRow>

      <TeamView
        initialTeamMembers={extractEdges<TeamMemberInTeamFragment>(
          team?.members.edges
        )}
        isSkeleton={isSkeleton}
        updateTeam={debouncedUpdateTeam}
        updateTeamMemberMoves={debouncedUpdateTeamMemberMoves}
      />
    </>
  );
};
