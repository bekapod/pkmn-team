import { dedupExchange, fetchExchange, cacheExchange } from 'urql';
import type { NextUrqlClientConfig } from 'next-urql';
import { devtoolsExchange } from '@urql/devtools';

export const createClient: NextUrqlClientConfig = ssrExchange => ({
  url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/graphql`,
  exchanges: [
    devtoolsExchange,
    dedupExchange,
    cacheExchange,
    ssrExchange,
    fetchExchange
  ]
});
