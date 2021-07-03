import { withUrqlClient, initUrqlClient } from 'next-urql';
import Link from 'next/link';
import { AllTeamsDocument, useAllTeamsQuery } from '~/generated/graphql';
import { createClient } from '~/lib/client';
import { FullWidthContainer } from '~/components/FullWidthContainer';
import { Page } from '~/components/Page';
import { TeamGrid } from '~/components/TeamGrid';
import { TeamCard } from '~/components/TeamCard';
import { CenteredRow } from '~/components/CenteredRow';
import { CtaLink } from '~/components/Cta';
import { ssrExchange } from 'urql';
import { GetStaticProps } from 'next';
import { extractNodesFromEdges } from '~/lib/relay';

function Home(): JSX.Element {
  const [{ data }] = useAllTeamsQuery();
  return (
    <Page title="Dashboard" metaTitle="Pkmn Team">
      <FullWidthContainer>
        <CenteredRow>
          <Link href="/team/create" passHref>
            <CtaLink>Create your own team</CtaLink>
          </Link>
        </CenteredRow>
        <TeamGrid as="ul" role="list" className="u-unstyled-list">
          {extractNodesFromEdges(data?.teams.edges).map(team => (
            <li key={team.id}>
              <TeamCard {...team} />
            </li>
          ))}
        </TeamGrid>
      </FullWidthContainer>
    </Page>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    createClient(process.env.INTERNAL_GRAPHQL_ENDPOINT)(ssrCache),
    false
  );

  if (client) {
    await client.query(AllTeamsDocument).toPromise();
  }

  return {
    props: {
      urqlState: ssrCache.extractData()
    },
    revalidate: 10
  };
};

export default withUrqlClient(createClient(), {
  ssr: false,
  neverSuspend: true
})(Home);
