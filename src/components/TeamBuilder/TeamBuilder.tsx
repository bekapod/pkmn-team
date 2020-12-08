/* eslint-disable @typescript-eslint/no-empty-function */
import { FunctionComponent } from 'react';
import { CenteredRow } from '../CenteredRow';
import { CtaButton } from '../Cta';
import { ErrorMessage } from '../ErrorMessage';
import { GiantInput } from '../GiantInput';
import { LoadingIcon } from '../LoadingIcon';
import { TeamView } from '../TeamView';
import { StickyBar } from '../StickyBar';
import { Pokemon, Team } from '~/generated/graphql';

export type TeamBuilderProps = {
  allPokemon: Pokemon[];
  team?: Team;
  loading?: boolean;
  error?: string;
};

export const TeamBuilder: FunctionComponent<TeamBuilderProps> = ({
  allPokemon,
  team,
  loading,
  error
}) => {
  return (
    <>
      <StickyBar>
        {!loading ? (
          <>
            <CtaButton type="button" key="save" size="small">
              Save team
            </CtaButton>
            <CtaButton type="button" key="delete" size="small">
              Delete team
            </CtaButton>
          </>
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
          defaultValue={team?.name ?? ''}
        />
      </CenteredRow>

      <TeamView
        updateTeamMembers={() => {}}
        allPokemon={allPokemon}
        initialTeamMembers={team?.members}
      />
    </>
  );
};
