import { dedupExchange, fetchExchange } from 'urql';
import type { NextUrqlClientConfig } from 'next-urql';
import { devtoolsExchange } from '@urql/devtools';
import { cacheExchange } from '@urql/exchange-graphcache';
import {
  AllTeamsDocument,
  AllTeamsQuery,
  TeamFragment
} from '~/generated/graphql';

export const createClient =
  (
    url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/graphql`,
    maskTypename = true
  ): NextUrqlClientConfig =>
  ssrExchange => ({
    url,
    maskTypename,
    exchanges: [
      devtoolsExchange,
      dedupExchange,
      cacheExchange({
        keys: {
          damageClass: data => `${data.value}`,
          pokemonType: () => null,
          teamMemberEdge: data => data.cursor as string
        },
        updates: {
          Mutation: {
            createTeam: (result, _args, cache) => {
              cache.updateQuery(
                { query: AllTeamsDocument },
                (data: AllTeamsQuery | null) => {
                  if (data?.teams?.edges && result.createTeam) {
                    data.teams.edges = [
                      {
                        __typename: 'TeamEdge',
                        node: result.createTeam as TeamFragment
                      },
                      ...data.teams.edges
                    ];
                  }

                  return data;
                }
              );
            },
            deleteTeam: (_result, args, cache) => {
              cache.updateQuery(
                { query: AllTeamsDocument },
                (data: AllTeamsQuery | null) => {
                  if (data?.teams?.edges) {
                    const newTeams = data.teams.edges.filter(
                      team => team?.node?.id !== args.id
                    );
                    data.teams.edges = newTeams;
                  }

                  return data;
                }
              );
            },
            deleteTeamMember: (_result, args, cache) => {
              cache.invalidate({
                __typename: 'TeamMemberEdge',
                id: args.id as string
              });
              cache.invalidate({
                __typename: 'TeamMember',
                id: args.id as string
              });
            }
          }
        }
      }),
      ssrExchange,
      fetchExchange
    ]
  });
