import Head from 'next/head';
import { withUrqlClient } from 'next-urql';
import { useAllPokemonQuery } from '../generated/graphql';
import { createClient } from '../lib/client';

function Home(): JSX.Element {
  const [{ data }] = useAllPokemonQuery();
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ul>
        {data?.allPokemonOrderedByPokedexId.data.map(pokemon => (
          <li key={pokemon?.pokedexId}>{pokemon?.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default withUrqlClient(createClient, { ssr: true })(Home);
