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
  Team_Member,
  useDeleteTeamMembersMutation
} from '~/generated/graphql';
import { createClient } from '~/lib/client';
import { FullWidthContainer } from '~/components/FullWidthContainer';
import { Page } from '~/components/Page';
import { TeamBuilder } from '~/components/TeamBuilder';
import { useCallback, useMemo } from 'react';
import { ssrExchange } from 'urql';

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

  const allPokemonOptions = useMemo(() => ({ pause: !id }), [id]);
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
    (members: Team_Member[]) => {
      const membersToCreate = members
        .filter(
          ({ id }) =>
            !team?.team_members.find(existingMember => id === existingMember.id)
        )
        .map(({ id, pokemon, order }) => ({
          id,
          pokemon_id: pokemon.id,
          order,
          team_id: team?.id
        }));

      const membersToDelete = team?.team_members
        .filter(({ id }) => !members.find(newMember => id === newMember.id))
        .map(({ id }) => id);

      if (membersToCreate.length) {
        createTeamMembers({
          members: membersToCreate
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
            deleteTeamMembersFetching
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
    await Promise.all([
      client.query(TeamByIdDocument, { id }).toPromise(),
      client.query(AllPokemonDocument).toPromise()
    ]);
  }

  return {
    props: {
      urqlState: ssrCache.extractData(),
      id
    }
  };
};

export default withUrqlClient(createClient(), { ssr: false })(Team);
