import ApolloClient, { InMemoryCache } from "apollo-boost";
import withApollo, { InitApolloOptions } from "next-with-apollo";
import { Pokemon } from "../types";

function createClient({ headers }: InitApolloOptions<{}>): ApolloClient<{}> {
  return new ApolloClient({
    clientState: {
      defaults: {
        currentSearchPokemon: undefined
      },
      resolvers: {
        Mutation: {
          setCurrentSearchPokemon: (
            _: any,
            variables: { pokemon: Pokemon },
            { cache }: { cache: InMemoryCache }
          ): { currentSearchPokemon: Pokemon } => {
            const data = { currentSearchPokemon: variables.pokemon };
            cache.writeData({ data });
            return data;
          }
        }
      }
    },
    request: async (operation): Promise<void> => {
      operation.setContext({
        fetchOptions: {
          credentials: "include"
        },
        headers
      });
    },
    uri: process.env.REACT_APP_API_URL
  });
}

export default withApollo(createClient);
