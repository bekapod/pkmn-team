import Head from 'next/head';
import type { NextComponentType, NextPageContext } from 'next';
import { NextUrqlPageContext, withUrqlClient } from 'next-urql';
import { useAllPokemonQuery, useTeamByIdQuery } from '~/generated/graphql';
import { createClient } from '~/lib/client';
import { FullWidthContainer } from '~/components/FullWidthContainer';
import { Heading } from '~/components/Heading';
import { TeamBuilder } from '~/components/TeamBuilder';

type Props = {
  id?: string;
};

const Team: NextComponentType<
  NextUrqlPageContext & { query: NextPageContext['query'] },
  Props,
  Props
> = ({ id }) => {
  const [{ data: teamData, fetching: teamFetching }] = useTeamByIdQuery({
    variables: { id },
    pause: !id
  });
  const [{ data: allPokemonData }] = useAllPokemonQuery({ pause: !id });
  const team = teamData?.teamById ?? undefined;
  const pokemon = allPokemonData?.pokemon;
  return (
    <div>
      <Head>
        <title>{team?.name} | Team | Pkmn Team</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.typekit.net/jdl7nve.css" />
      </Head>
      <Heading>Team: {team?.name}</Heading>
      <FullWidthContainer>
        {!!pokemon && (
          <TeamBuilder
            allPokemon={pokemon}
            team={team}
            loading={teamFetching}
          />
        )}
      </FullWidthContainer>
    </div>
  );
};

Team.getInitialProps = context => {
  return { id: context.query.id?.toString() };
};

export default withUrqlClient(createClient, { ssr: true })(Team);
