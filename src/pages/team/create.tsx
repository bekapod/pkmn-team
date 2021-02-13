import { useRouter } from 'next/router';
import { useEffect } from 'react';
import type { NextComponentType } from 'next';
import { NextUrqlPageContext, withUrqlClient } from 'next-urql';
import { createClient } from '~/lib/client';
import { FullWidthContainer } from '~/components/FullWidthContainer';
import { Page } from '~/components/Page';
import { TeamCreator, TeamCreatorFormValues } from '~/components/TeamCreator';
import { useCreateTeamMutation } from '~/generated/graphql';

const TeamCreate: NextComponentType<NextUrqlPageContext> = () => {
  const router = useRouter();
  const [{ data, fetching }, createTeam] = useCreateTeamMutation();

  useEffect(() => {
    const id = data?.createTeam?.id;
    if (id) {
      router.push(`/team/${id}`);
    }
  }, [data?.createTeam?.id, router]);

  const createTeamHandler = (values: TeamCreatorFormValues) => {
    createTeam({ name: values['team-name'] });
  };

  return (
    <Page title="Create a team" metaTitle="Create a team | Team | Pkmn Team">
      <FullWidthContainer>
        <TeamCreator createTeam={createTeamHandler} isLoading={fetching} />
      </FullWidthContainer>
    </Page>
  );
};

export default withUrqlClient(createClient(), { ssr: false })(TeamCreate);
