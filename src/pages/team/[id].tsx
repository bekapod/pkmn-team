import type { NextComponentType, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { NextUrqlPageContext, withUrqlClient } from 'next-urql';
import {
  useAllPokemonQuery,
  useTeamByIdQuery,
  useUpdateTeamMutation,
  useDeleteTeamMutation
} from '~/generated/graphql';
import { createClient } from '~/lib/client';
import { FullWidthContainer } from '~/components/FullWidthContainer';
import { Page } from '~/components/Page';
import { TeamBuilder } from '~/components/TeamBuilder';
import { useCallback, useMemo } from 'react';

type Props = {
  id?: string;
};

const Team: NextComponentType<
  NextUrqlPageContext & { query: NextPageContext['query'] },
  Props,
  Props
> = ({ id }) => {
  const router = useRouter();
  const teamByIdOptions = useMemo(() => ({ variables: { id }, pause: !id }), [
    id
  ]);
  const [{ data: teamData, fetching }] = useTeamByIdQuery(teamByIdOptions);

  const allPokemonOptions = useMemo(() => ({ pause: !id }), [id]);
  const [{ data: allPokemonData }] = useAllPokemonQuery(allPokemonOptions);

  const [
    { fetching: updateTeamFetching },
    updateTeam
  ] = useUpdateTeamMutation();
  const [
    { fetching: deleteTeamFetching },
    deleteTeam
  ] = useDeleteTeamMutation();

  const team = teamData?.teamById ?? undefined;
  const pokemon = allPokemonData?.pokemon;

  const updateTeamHandler = useCallback(
    (name: string) => {
      if (team?.id && team?.name !== name) {
        updateTeam({ id: team?.id, name });
      }
    },
    [team?.id, team?.name, updateTeam]
  );

  const deleteTeamHandler = useCallback(async () => {
    if (team?.id) {
      const { data } = await deleteTeam({ id: team?.id });
      if (data?.deleteTeam?.id) router.push('/');
    }
  }, [team?.id, router, deleteTeam]);

  return (
    <Page
      title={`Team: ${team?.name ?? '…'}`}
      metaTitle={`${team?.name ?? '…'} | Team | Pkmn Team`}
    >
      <FullWidthContainer aria-busy={fetching}>
        {!!pokemon && !!team && (
          <TeamBuilder
            allPokemon={pokemon}
            team={team}
            loading={updateTeamFetching || deleteTeamFetching}
            updateTeam={updateTeamHandler}
            deleteTeam={deleteTeamHandler}
          />
        )}
      </FullWidthContainer>
    </Page>
  );
};

Team.getInitialProps = context => {
  return { id: context.query.id?.toString() };
};

export default withUrqlClient(createClient, { ssr: true })(Team);
