import Head from 'next/head';
import type { NextComponentType, NextPageContext } from 'next';
import { NextUrqlPageContext, withUrqlClient } from 'next-urql';
import {
  useAllPokemonQuery,
  useTeamByIdQuery,
  useUpdateTeamMutation
} from '~/generated/graphql';
import { createClient } from '~/lib/client';
import { FullWidthContainer } from '~/components/FullWidthContainer';
import { Heading } from '~/components/Heading';
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
  const teamByIdOptions = useMemo(() => ({ variables: { id }, pause: !id }), [
    id
  ]);
  const [{ data: teamData }] = useTeamByIdQuery(teamByIdOptions);

  const allPokemonOptions = useMemo(() => ({ pause: !id }), [id]);
  const [{ data: allPokemonData }] = useAllPokemonQuery(allPokemonOptions);

  const [
    { fetching: updateTeamFetching },
    updateTeam
  ] = useUpdateTeamMutation();

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

  return (
    <>
      <Head>
        <title>{team?.name} | Team | Pkmn Team</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.typekit.net/jdl7nve.css" />
      </Head>
      <Heading>Team: {team?.name}</Heading>
      <FullWidthContainer>
        {!!pokemon && !!team && (
          <TeamBuilder
            allPokemon={pokemon}
            team={team}
            loading={updateTeamFetching}
            updateTeam={updateTeamHandler}
          />
        )}
      </FullWidthContainer>
    </>
  );
};

Team.getInitialProps = context => {
  return { id: context.query.id?.toString() };
};

export default withUrqlClient(createClient, { ssr: true })(Team);
