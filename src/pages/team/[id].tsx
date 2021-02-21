import type {
  GetServerSideProps,
  NextComponentType,
  NextPageContext
} from 'next';
import { useRouter } from 'next/router';
import { initUrqlClient, NextUrqlPageContext, withUrqlClient } from 'next-urql';
import {
  useAllPokemonQuery,
  useTeamByIdQuery,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
  useCreateTeamMembersMutation,
  TeamByIdDocument,
  AllPokemonDocument,
  useDeleteTeamMembersMutation,
  useCreateTeamMemberMovesMutation,
  TeamMemberFragmentFragment,
  useDeleteTeamMemberMovesMutation,
  MoveFragmentFragment
} from '~/generated/graphql';
import { createClient } from '~/lib/client';
import { FullWidthContainer } from '~/components/FullWidthContainer';
import { Page } from '~/components/Page';
import { TeamBuilder } from '~/components/TeamBuilder';
import { useCallback, useMemo, useState } from 'react';
import { ssrExchange } from 'urql';
import isEqual from 'react-fast-compare';

type Props = {
  id?: string;
};

const Team: NextComponentType<
  NextUrqlPageContext & { query: NextPageContext['query'] },
  Props,
  Props
> = ({ id }) => {
  const router = useRouter();
  const teamByIdOptions = useMemo(() => ({ variables: { id }, pause: !id }), [
    id
  ]);
  const [{ data: teamData, fetching: teamFetching }] = useTeamByIdQuery(
    teamByIdOptions
  );

  const [limit] = useState(1000);
  const [offset] = useState(0);
  const allPokemonOptions = useMemo(
    () =>
      ({
        variables: { offset, limit },
        pause: !id
      } as const),
    [id, limit, offset]
  );
  const [{ data: allPokemonData }] = useAllPokemonQuery(allPokemonOptions);

  const [
    { fetching: updateTeamFetching },
    updateTeam
  ] = useUpdateTeamMutation();
  const [
    { fetching: deleteTeamFetching },
    deleteTeam
  ] = useDeleteTeamMutation();
  const [
    { fetching: createTeamMembersFetching },
    createTeamMembers
  ] = useCreateTeamMembersMutation();
  const [
    { fetching: deleteTeamMembersFetching },
    deleteTeamMembers
  ] = useDeleteTeamMembersMutation();
  const [
    { fetching: createTeamMemberMovesFetching },
    createTeamMemberMoves
  ] = useCreateTeamMemberMovesMutation();
  const [
    { fetching: deleteTeamMemberMovesFetching },
    deleteTeamMemberMoves
  ] = useDeleteTeamMemberMovesMutation();

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

  const deleteTeamHandler = useCallback(async () => {
    if (team?.id) {
      const { data } = await deleteTeam({ id: team?.id });
      if (data?.deleteTeam?.id) router.push('/');
    }
  }, [team?.id, router, deleteTeam]);

  const updateTeamMembersHandler = useCallback(
    (members: TeamMemberFragmentFragment[]) => {
      const membersToUpdate = members.map(({ id, pokemon, order }) => ({
        id,
        pokemon_id: pokemon.id,
        order,
        team_id: team?.id
      }));

      const membersToDelete = team?.team_members
        .filter(({ id }) => !members.find(newMember => id === newMember.id))
        .map(({ id }) => id);

      if (membersToUpdate.length && !isEqual(members, team?.team_members)) {
        createTeamMembers({
          members: membersToUpdate
        });
      }

      if (membersToDelete && membersToDelete.length) {
        deleteTeamMembers({
          members: membersToDelete
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(team), createTeamMembers]
  );

  const updateTeamMemberMovesHandler = useCallback(
    (member: TeamMemberFragmentFragment, moves: MoveFragmentFragment[]) => {
      const movesToDelete = member?.learned_moves
        ?.filter(({ move }) => !moves.find(newMove => move.id === newMove.id))
        .map(({ move }) => move.id);
      const remainingLearnedMoves = member?.learned_moves
        ?.filter(({ move }) => moves.find(newMove => move.id === newMove.id))
        .map(({ move }) => move);

      console.log({
        moves,
        learnedMoves: remainingLearnedMoves,
        isEqual: isEqual(moves, remainingLearnedMoves),
        movesToDelete
      });

      if (moves.length && !isEqual(moves, remainingLearnedMoves)) {
        console.log('CREATING');
        createTeamMemberMoves({
          moves: moves.map((move, idx) => ({
            move_id: move.id,
            order: idx,
            team_member_id: member.id
          }))
        });
      }

      if (movesToDelete && movesToDelete.length) {
        console.log('DELETING');
        deleteTeamMemberMoves({
          moveIds: movesToDelete,
          memberId: member.id
        });
      }
    },
    [createTeamMemberMoves, deleteTeamMemberMoves]
  );

  return (
    <Page
      title={`Team: ${team?.name ?? '…'}`}
      metaTitle={`${team?.name ?? '…'} | Team | Pkmn Team`}
    >
      <FullWidthContainer>
        <TeamBuilder
          allPokemon={pokemon}
          team={team}
          isSkeleton={teamFetching}
          isLoading={
            updateTeamFetching ||
            deleteTeamFetching ||
            createTeamMembersFetching ||
            deleteTeamMembersFetching ||
            createTeamMemberMovesFetching ||
            deleteTeamMemberMovesFetching
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
