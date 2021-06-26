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
          pokemonType: () => null
        },
        updates: {
          Mutation: {
            createTeam: (result, _args, cache) => {
              cache.updateQuery(
                { query: AllTeamsDocument },
                (data: AllTeamsQuery | null) => {
                  if (data?.teams?.edges && result.createTeam) {
                    data.teams.edges.unshift({
                      node: result.createTeam as TeamFragment
                    });
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
            }
          }
        }
      }),
      ssrExchange,
      fetchExchange
    ]
  });
