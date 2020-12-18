import Head from 'next/head';
import { withUrqlClient } from 'next-urql';
import { useAllTeamsQuery } from '~/generated/graphql';
import { createClient } from '~/lib/client';
import { FullWidthContainer } from '~/components/FullWidthContainer';
import { Heading } from '~/components/Heading';
import { TeamGrid } from '~/components/TeamGrid';
import { TeamCard } from '~/components/TeamCard';

function Home(): JSX.Element {
  const [{ data }] = useAllTeamsQuery();
  return (
    <>
      <Head>
        <title>Pkmn Team</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.typekit.net/jdl7nve.css" />
      </Head>
      <Heading>Dashboard</Heading>
      <FullWidthContainer>
        <TeamGrid as="ul" role="list" className="u-unstyled-list">
          {data?.teams.map(team => (
            <li key={team.id}>
              <TeamCard {...team} />
            </li>
          ))}
        </TeamGrid>
      </FullWidthContainer>
    </>
  );
}

export default withUrqlClient(createClient, { ssr: true })(Home);
