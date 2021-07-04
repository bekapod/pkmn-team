import { withUrqlClient, initUrqlClient } from 'next-urql';
import {
  AllTeamsDocument,
  useAllTeamsQuery,
  useCreateTeamMutation
} from '~/generated/graphql';
import { createClient } from '~/lib/client';
import { FullWidthContainer } from '~/components/FullWidthContainer';
import { Page } from '~/components/Page';
import { TeamGrid } from '~/components/TeamGrid';
import { TeamCard } from '~/components/TeamCard';
import { CenteredRow } from '~/components/CenteredRow';
import { TeamCreator, TeamCreatorFormValues } from '~/components/TeamCreator';
import { ssrExchange } from 'urql';
import { GetStaticProps } from 'next';
import { extractNodesFromEdges } from '~/lib/relay';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function Home(): JSX.Element {
  const [{ data }] = useAllTeamsQuery();
  const router = useRouter();
  const [{ data: createdTeamData, fetching }, createTeam] =
    useCreateTeamMutation();

  useEffect(() => {
    const id = createdTeamData?.createTeam?.id;
    if (id) {
      router.push(`/team/${id}`);
    }
  }, [createdTeamData?.createTeam?.id, router]);

  const createTeamHandler = (values: TeamCreatorFormValues) => {
    createTeam({ name: values['team-name'] });
  };

  return (
    <Page title="Dashboard" metaTitle="Pkmn Team">
      <FullWidthContainer>
        <CenteredRow>
          <TeamCreator
            createTeam={createTeamHandler}
            isLoading={fetching}
            className="w-full lg:w-4/5 xl:w-3/5"
          />
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

export const getServerSideProps: GetStaticProps = async () => {
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
    }
  };
};

export default withUrqlClient(createClient(), {
  ssr: false,
  neverSuspend: true
})(Home);
