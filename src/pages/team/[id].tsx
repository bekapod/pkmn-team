import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { initUrqlClient, withUrqlClient } from 'next-urql';
import {
  useTeamByIdQuery,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
  TeamByIdDocument,
  useDeleteTeamMemberMutation,
  TeamMemberInTeamFragment
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
  const [{ fetching: deleteTeamMemberFetching }, deleteTeamMember] =
    useDeleteTeamMemberMutation();

  const team = teamData?.teamById ?? undefined;

  const updateTeamHandler = useCallback(
    ({
      name,
      members
    }: {
      name?: string;
      members?: TeamMemberInTeamFragment[];
    }) => {
      const values = {
        id: team?.id as string,
        name: name ?? (team?.name as string),
        members: members?.map(member => ({
          id: member.node?.id,
          slot: member.slot,
          pokemonId: member.node?.pokemon.id
        }))
      };

      if (
        values.id &&
        (team?.name !== values.name || !isEqual(team?.members.edges, members))
      ) {
        console.log(team?.name, values.name, team?.name !== values.name);
        console.log(
          team?.members.edges,
          members,
          !isEqual(team?.members.edges, members)
        );
        updateTeam(values);
      }

      const membersToDelete = team?.members.edges
        ?.filter(
          member =>
            !members?.find(newMember => member?.node?.id === newMember.node?.id)
        )
        .map(member => member?.node?.id);

      membersToDelete?.forEach(member => {
        member && deleteTeamMember({ id: member });
      });
    },
    [team, updateTeam, deleteTeamMember]
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
      <FullWidthContainer>
        <TeamBuilder
          team={team}
          isSkeleton={teamFetching}
          isLoading={
            updateTeamFetching || deleteTeamFetching || deleteTeamMemberFetching
          }
          updateTeam={updateTeamHandler}
          deleteTeam={deleteTeamHandler}
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
