import ApolloClient from "apollo-boost";
import withApollo, { InitApolloOptions } from "next-with-apollo";
import { IPokemon } from "../types";

function createClient({ headers }: InitApolloOptions<{}>) {
  return new ApolloClient({
    clientState: {
      defaults: {
        currentSearchPokemon: undefined
      },
      resolvers: {
        Mutation: {
          setCurrentSearchPokemon: (
            _: any,
            variables: { pokemon: IPokemon },
            { cache }
          ) => {
            const data = { currentSearchPokemon: variables.pokemon };
            cache.writeData({ data });
            return data;
          }
        }
      }
    },
    request: async operation => {
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
