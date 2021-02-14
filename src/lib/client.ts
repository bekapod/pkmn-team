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
  Teams
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
        pokemon_type: () => null
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
                  data?.teamById?.team_members.push(
                    ...result?.createTeamMembers?.returning
                  );
                  return data;
                }
              );
            }
          }
        }
      }
    }),
    ssrExchange,
    fetchExchange
  ]
});
