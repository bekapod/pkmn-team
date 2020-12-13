import { FunctionComponent, useState } from 'react';
import { CenteredRow } from '../CenteredRow';
import { CtaButton } from '../Cta';
import { ErrorMessage } from '../ErrorMessage';
import { GiantInput } from '../GiantInput';
import { LoadingIcon } from '../LoadingIcon';
import { TeamView } from '../TeamView';
import { StickyBar } from '../StickyBar';
import { Pokemon, Teams } from '~/generated/graphql';
import { useDebouncedEffect } from '~/hooks/useDebouncedEffect';

export type TeamBuilderProps = {
  allPokemon: Pokemon[];
  team: Teams;
  loading?: boolean;
  error?: string;
  updateTeam?: (name: string) => void;
};

const TeamNameInput: FunctionComponent<{
  value?: string;
  handleChange?: (value: string) => void;
}> = ({ value, handleChange }) => {
  const [teamName, setTeamName] = useState(value ?? '');

  useDebouncedEffect(
    () => {
      if (teamName && teamName !== value) {
        handleChange?.(teamName);
      }
    },
    [teamName, value],
    1000
  );

  return (
    <GiantInput
      aria-label="Choose a team name"
      placeholder="Choose a team name"
      value={teamName}
      onChange={e => setTeamName(e.currentTarget.value)}
    />
  );
};

export const TeamBuilder: FunctionComponent<TeamBuilderProps> = ({
  allPokemon,
  team,
  loading,
  error,
  updateTeam
}) => {
  return (
    <>
      <StickyBar>
        {!loading ? (
          <CtaButton type="button" key="delete" size="small" disabled>
            Delete team
          </CtaButton>
        ) : null}

        {!!error && (
          <ErrorMessage color="var(--color-white)">{error}</ErrorMessage>
        )}

        {loading && <LoadingIcon key="Loading icon" spinner small />}
      </StickyBar>

      <CenteredRow stackVertically>
        <TeamNameInput value={team?.name} handleChange={updateTeam} />
      </CenteredRow>

      <TeamView
        allPokemon={allPokemon}
        initialTeamMembers={team?.team_members}
      />
    </>
  );
};
