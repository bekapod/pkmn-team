import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { initUrqlClient, withUrqlClient } from 'next-urql';
import {
  useTeamByIdQuery,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
  TeamByIdDocument,
  TeamFragment
} from '~/generated/graphql';
import { createClient } from '~/lib/client';
import { FullWidthContainer } from '~/components/FullWidthContainer';
import { Page } from '~/components/Page';
import { TeamBuilder } from '~/components/TeamBuilder';
import { useCallback, useMemo } from 'react';
import { ssrExchange } from 'urql';
import isEqual from 'react-fast-compare';

type Props = {
  id?: string;
};

const Team: NextPage<Props> = ({ id }) => {
  const router = useRouter();
  const teamByIdOptions = useMemo(
    () => ({ variables: { id: id as string }, pause: !id }),
    [id]
  );
  const [{ data: teamData, fetching: teamFetching }] =
    useTeamByIdQuery(teamByIdOptions);

  const [{ fetching: updateTeamFetching }, updateTeam] =
    useUpdateTeamMutation();
  const [{ fetching: deleteTeamFetching }, deleteTeam] =
    useDeleteTeamMutation();

  const team = teamData?.teamById ?? undefined;

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

  const updateTeamMembersHandler = useCallback(
    (members: TeamFragment['members']) => {
      const membersToDelete = team?.members.edges
        ?.filter(
          member =>
            !members.edges?.find(
              newMember => member?.node?.id === newMember?.node?.id
            )
        )
        .map(member => member?.node?.id);

      if (members.edges?.length && !isEqual(members, team?.members)) {
        // createTeamMembers({
        //   members: membersToUpdate
        // });
      }

      if (membersToDelete && membersToDelete.length) {
        // deleteTeamMembers({
        //   members: membersToDelete
        // });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(team)]
  );

  return (
    <Page
      title={`Team: ${team?.name ?? '…'}`}
      metaTitle={`${team?.name ?? '…'} | Team | Pkmn Team`}
    >
      <FullWidthContainer>
        <TeamBuilder
          team={team}
          isSkeleton={teamFetching}
          isLoading={
            updateTeamFetching || deleteTeamFetching
            // createTeamMembersFetching ||
            // deleteTeamMembersFetching ||
            // createTeamMemberMovesFetching ||
            // deleteTeamMemberMovesFetching
          }
          updateTeam={updateTeamHandler}
          deleteTeam={deleteTeamHandler}
          updateTeamMembers={updateTeamMembersHandler}
        />
      </FullWidthContainer>
    </Page>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    createClient(`${process.env.INTERNAL_GRAPHQL_ENDPOINT}/graphql`)(ssrCache),
    false
  );
  const id = context.params?.id?.toString();

  if (client && id) {
    await Promise.all([client.query(TeamByIdDocument, { id }).toPromise()]);
  }

  return {
    props: {
      urqlState: ssrCache.extractData(),
      id
    }
  };
};

export default withUrqlClient(createClient(), {
  ssr: false,
  neverSuspend: true
})(Team);
