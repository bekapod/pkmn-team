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
import type {
  TeamByIdQuery,
  TeamMemberFragmentFragment,
  Team,
  TeamMemberMoveFragmentFragment
} from '~/generated/graphql';

export type TeamBuilderProps = {
  team?: TeamByIdQuery['teamById'];
  isLoading?: boolean;
  isSkeleton?: boolean;
  error?: CombinedError;
  updateTeam?: (name: string) => void;
  deleteTeam?: () => void;
  updateTeamMembers?: (members: Team['members']) => void;
  updateTeamMemberMoves?: (
    member: TeamMemberFragmentFragment,
    moves: TeamMemberMoveFragmentFragment['move'][]
  ) => void;
};

export const TeamBuilder: FunctionComponent<TeamBuilderProps> = ({
  team,
  isLoading,
  isSkeleton,
  error,
  updateTeam,
  deleteTeam,
  updateTeamMembers,
  updateTeamMemberMoves
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdateTeam = useCallback(
    debounce(nextValue => updateTeam?.(nextValue), 1000),
    [updateTeam]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdateTeamMembers = useCallback(
    debounce(nextValue => updateTeamMembers?.(nextValue), 1000),
    [updateTeamMembers]
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
          onChange={e => debouncedUpdateTeam(e.currentTarget.value)}
          disabled={isSkeleton}
        />
      </CenteredRow>

      <TeamView
        initialTeamMembers={team?.members?.teamMembers}
        isSkeleton={isSkeleton}
        updateTeamMembers={debouncedUpdateTeamMembers}
        updateTeamMemberMoves={updateTeamMemberMoves}
      />
    </>
  );
};
