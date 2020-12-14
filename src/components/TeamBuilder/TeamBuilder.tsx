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
  loading?: boolean;
  error?: string;
  updateTeam?: (name: string) => void;
  deleteTeam?: () => void;
};

export const TeamBuilder: FunctionComponent<TeamBuilderProps> = ({
  allPokemon,
  team,
  loading,
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
        {!loading ? (
          <CtaButton
            type="button"
            key="delete"
            size="small"
            onClick={deleteTeam}
          >
            Delete team
          </CtaButton>
        ) : null}

        {!!error && (
          <ErrorMessage color="var(--color-white)">{error}</ErrorMessage>
        )}

        {loading && <LoadingIcon key="Loading icon" spinner small />}
      </StickyBar>

      <CenteredRow stackVertically>
        <GiantInput
          aria-label="Choose a team name"
          placeholder="Choose a team name"
          defaultValue={team?.name}
          onChange={e => debouncedUpdateTeam?.(e.currentTarget.value)}
        />
      </CenteredRow>

      <TeamView
        allPokemon={allPokemon}
        initialTeamMembers={team?.team_members}
      />
    </>
  );
};
