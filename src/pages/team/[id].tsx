import Head from 'next/head';
import { NextUrqlPageContext, withUrqlClient } from 'next-urql';
import { useTeamByIdQuery } from '~/generated/graphql';
import { createClient } from '~/lib/client';
import { FullWidthContainer } from '~/components/FullWidthContainer';
import { Heading } from '~/components/Heading';
import { TeamCard } from '~/components/TeamCard';
import { NextComponentType, NextPageContext } from 'next';

type Props = {
  id?: string;
};

const Team: NextComponentType<
  NextUrqlPageContext & { query: NextPageContext['query'] },
  Props,
  Props
> = ({ id }) => {
  const [{ data }] = useTeamByIdQuery({ variables: { id }, pause: !id });
  const team = data?.teamById;
  return (
    <div>
      <Head>
        <title>{team?.name} | Team | Pkmn Team</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.typekit.net/jdl7nve.css" />
      </Head>
      <Heading>Team: {team?.name}</Heading>
      <FullWidthContainer>
        {team ? <TeamCard {...team} /> : null}
      </FullWidthContainer>
    </div>
  );
};

Team.getInitialProps = context => {
  return { id: context.query.id?.toString() };
};

export default withUrqlClient(createClient, { ssr: true })(Team);
