import type {
  GetServerSideProps,
  NextComponentType,
  NextPageContext
} from 'next';
import { useRouter } from 'next/router';
import { initUrqlClient, NextUrqlPageContext, withUrqlClient } from 'next-urql';
import {
  useTeamByIdQuery,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
  TeamByIdDocument,
  TeamMemberFragmentFragment,
  TeamMemberList,
  TeamMemberMoveFragmentFragment
} from '~/generated/graphql';
import { createClient } from '~/lib/client';
import { FullWidthContainer } from '~/components/FullWidthContainer';
import { Page } from '~/components/Page';
import { TeamBuilder } from '~/components/TeamBuilder';
import { useCallback, useMemo } from 'react';
import { ssrExchange } from 'urql';
import isEqual from 'react-fast-compare';

type Props = {
  id: string;
};

const Team: NextComponentType<
  NextUrqlPageContext & { query: NextPageContext['query'] },
  unknown,
  Props
> = ({ id }) => {
  const router = useRouter();
  const teamByIdOptions = useMemo(() => ({ variables: { id }, pause: !id }), [
    id
  ]);
  const [{ data: teamData, fetching: teamFetching }] = useTeamByIdQuery(
    teamByIdOptions
  );

  const [
    { fetching: updateTeamFetching },
    updateTeam
  ] = useUpdateTeamMutation();
  const [
    { fetching: deleteTeamFetching },
    deleteTeam
  ] = useDeleteTeamMutation();

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
    (members: TeamMemberList) => {
      const membersToUpdate = members.teamMembers.map(
        ({ id, pokemon, slot }) => ({
          id,
          pokemon_id: pokemon.id,
          slot,
          team_id: team?.id
        })
      );

      const membersToDelete = team?.members.teamMembers
        .filter(
          ({ id }) =>
            !members.teamMembers.find(newMember => id === newMember.id)
        )
        .map(({ id }) => id);

      if (
        membersToUpdate.length &&
        !isEqual(members, team?.members.teamMembers)
      ) {
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

  const updateTeamMemberMovesHandler = useCallback(
    (
      member: TeamMemberFragmentFragment,
      moves: TeamMemberMoveFragmentFragment['move'][]
    ) => {
      const movesToDelete = member?.moves?.teamMemberMoves
        ?.filter(
          ({ move }) => !moves.find(newMove => move.move.id === newMove.move.id)
        )
        .map(({ move }) => move.move.id);
      const remainingLearnedMoves = member?.moves?.teamMemberMoves
        ?.filter(({ move }) =>
          moves.find(newMove => move.move.id === newMove.move.id)
        )
        .map(({ move }) => move);

      if (moves.length && !isEqual(moves, remainingLearnedMoves)) {
        // createTeamMemberMoves({
        //   moves: moves.map((move, idx) => ({
        //     move_id: move.id,
        //     order: idx,
        //     team_member_id: member.id
        //   }))
        // });
      }

      if (movesToDelete && movesToDelete.length) {
        // deleteTeamMemberMoves({
        //   moveIds: movesToDelete,
        //   memberId: member.id
        // });
      }
    },
    []
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
          updateTeamMemberMoves={updateTeamMemberMovesHandler}
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

export default withUrqlClient(createClient(), { ssr: false })(Team);
