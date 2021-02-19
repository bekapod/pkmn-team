import { dedupExchange, fetchExchange } from 'urql';
import type { NextUrqlClientConfig } from 'next-urql';
import { devtoolsExchange } from '@urql/devtools';
import { cacheExchange } from '@urql/exchange-graphcache';
import schema from '~/generated/introspection.json';
import {
  AllTeamsDocument,
  AllTeamsQuery,
  TeamByIdDocument,
  TeamByIdQuery,
  Teams,
  Team_Member
} from '~/generated/graphql';

export const createClient = (
  url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/graphql`,
  maskTypename = true
): NextUrqlClientConfig => ssrExchange => ({
  url,
  maskTypename,
  exchanges: [
    devtoolsExchange,
    dedupExchange,
    cacheExchange({
      schema: schema as never,
      keys: {
        damage_class: data => `${data.value}`,
        pokemon_move: () => null,
        pokemon_type: () => null,
        team_member_move: () => null
      },
      updates: {
        Mutation: {
          createTeam: (result, _args, cache) => {
            cache.updateQuery(
              { query: AllTeamsDocument },
              (data: AllTeamsQuery | null) => {
                if (data?.teams && result.createTeam) {
                  data.teams.unshift(result.createTeam as Teams);
                }

                return data;
              }
            );
          },
          deleteTeam: (_result, args, cache) => {
            cache.updateQuery(
              { query: AllTeamsDocument },
              (data: AllTeamsQuery | null) => {
                if (data?.teams) {
                  const newTeams = data.teams.filter(
                    team => team.id !== args.id
                  );
                  data.teams = newTeams;
                }

                return data;
              }
            );
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          createTeamMembers: (result: any, args: any, cache) => {
            if (Array.isArray(args?.objects)) {
              const teamId = args?.objects[0]?.team_id;
              cache.updateQuery(
                { query: TeamByIdDocument, variables: { id: teamId } },
                (data: TeamByIdQuery | null) => {
                  if (data?.teamById) {
                    const updatedMembers = result?.createTeamMembers?.returning;

                    data.teamById.team_members = [
                      ...data?.teamById?.team_members.filter(
                        ({ id }) =>
                          !updatedMembers.find(
                            (updatedMember: Team_Member) =>
                              id === updatedMember.id
                          )
                      ),
                      ...updatedMembers
                    ];
                  }

                  return data;
                }
              );
            }
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          deleteTeamMembers: (result: any, _args, cache) => {
            const teamId = result?.deleteTeamMembers?.returning[0]?.team?.id;
            cache.updateQuery(
              { query: TeamByIdDocument, variables: { id: teamId } },
              (data: TeamByIdQuery | null) => {
                if (data?.teamById) {
                  const deletedMembers = result?.deleteTeamMembers?.returning;

                  data.teamById.team_members = data?.teamById?.team_members.filter(
                    ({ id }) =>
                      !deletedMembers.find(
                        (deletedMember: Team_Member) => id === deletedMember.id
                      )
                  );
                }

                return data;
              }
            );
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          createTeamMemberMove: (result: any, _args, cache) => {
            const teamId = result?.createTeamMemberMove?.team_member?.team?.id;
            cache.updateQuery(
              {
                query: TeamByIdDocument,
                variables: { id: teamId }
              },
              (data: TeamByIdQuery | null) => {
                if (data?.teamById) {
                  const teamMember = data.teamById.team_members.find(
                    ({ id }) =>
                      result?.createTeamMemberMove?.team_member?.id === id
                  );
                  const existingMove = teamMember?.learned_moves.find(
                    ({ move }) =>
                      move.id === result?.createTeamMemberMove?.move?.id
                  );

                  if (existingMove) {
                    existingMove.order = result?.createTeamMemberMove?.order;
                  } else {
                    teamMember?.learned_moves.push(
                      result?.createTeamMemberMove
                    );
                  }
                }

                return data;
              }
            );
          }
        }
      }
    }),
    ssrExchange,
    fetchExchange
  ]
});
