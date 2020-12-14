import { dedupExchange, fetchExchange } from 'urql';
import type { NextUrqlClientConfig } from 'next-urql';
import { devtoolsExchange } from '@urql/devtools';
import { cacheExchange } from '@urql/exchange-graphcache';
import schema from '~/generated/introspection.json';
import { AllTeamsDocument, AllTeamsQuery } from '~/generated/graphql';

export const createClient: NextUrqlClientConfig = ssrExchange => ({
  url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/graphql`,
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
          }
        }
      }
    }),
    ssrExchange,
    fetchExchange
  ]
});
