import { dedupExchange, fetchExchange } from 'urql';
import type { NextUrqlClientConfig } from 'next-urql';
import { devtoolsExchange } from '@urql/devtools';
import { cacheExchange } from '@urql/exchange-graphcache';

export const createClient: NextUrqlClientConfig = ssrExchange => ({
  url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/graphql`,
  exchanges: [
    devtoolsExchange,
    dedupExchange,
    cacheExchange({
      keys: {
        damage_class: data => `${data.value}`,
        pokemon_move: () => null,
        pokemon_type: () => null
      }
    }),
    ssrExchange,
    fetchExchange
  ]
});
