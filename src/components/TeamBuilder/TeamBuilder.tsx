import { FunctionComponent, useCallback } from 'react';
import { debounce } from 'lodash';
import { CenteredRow } from '../CenteredRow';
import { CtaButton } from '../Cta';
import { ErrorMessage } from '../ErrorMessage';
import { GiantInput } from '../GiantInput';
import { LoadingIcon } from '../LoadingIcon';
import { TeamView } from '../TeamView';
import { StickyBar } from '../StickyBar';
import { Pokemon, Teams } from '~/generated/graphql';

export type TeamBuilderProps = {
  allPokemon: Pokemon[];
  team: Teams;
  isLoading?: boolean;
  isSkeleton?: boolean;
  error?: string;
  updateTeam?: (name: string) => void;
  deleteTeam?: () => void;
};

export const TeamBuilder: FunctionComponent<TeamBuilderProps> = ({
  allPokemon,
  team,
  isLoading,
  isSkeleton,
  error,
  updateTeam,
  deleteTeam
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdateTeam = useCallback(
    debounce(nextValue => updateTeam?.(nextValue), 1000),
    [updateTeam]
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
            onClick={deleteTeam}
          >
            Delete team
          </CtaButton>
        ) : null}

        {!!error && (
          <ErrorMessage color="var(--color-white)">{error}</ErrorMessage>
        )}

        {(isLoading || isSkeleton) && (
          <LoadingIcon key="Loading icon" spinner small />
        )}
      </StickyBar>

      <CenteredRow stackVertically>
        <GiantInput
          aria-label="Choose a team name"
          placeholder="Choose a team name"
          defaultValue={team?.name}
          onChange={e => debouncedUpdateTeam?.(e.currentTarget.value)}
          disabled={isSkeleton}
        />
      </CenteredRow>

      <TeamView
        allPokemon={allPokemon}
        initialTeamMembers={team?.team_members}
        isSkeleton={isSkeleton}
      />
    </>
  );
};
