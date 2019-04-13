import { getOr } from "lodash/fp";
import React from "react";
import { adopt } from "react-adopt";
import { Mutation, OperationVariables, Query, QueryResult } from "react-apollo";
import PokemonSearch from "../../components/PokemonSearch";
import { setCurrentSearchPokemon } from "../../mutations/search";
import { getPokemon } from "../../queries/pokemon";
import { Pokemon } from "../../types";

interface QueryProps {
  getAllPokemonQuery: QueryResult<{ pokemon: Pokemon[] }, OperationVariables>;
  setCurrentSearchPokemonMutation: ({
    variables: { pokemon }
  }: {
    variables: { pokemon: Pokemon };
  }) => void;
}

const queries = {
  getAllPokemonQuery: ({ render }: any): JSX.Element => (
    <Query query={getPokemon}>{render}</Query>
  )
};

const mutations = {
  setCurrentSearchPokemonMutation: ({ render }: any): JSX.Element => (
    <Mutation mutation={setCurrentSearchPokemon}>{render}</Mutation>
  )
};

const WithQueries = adopt({ ...queries, ...mutations });

const PokemonSearchContainer = (): JSX.Element => (
  <WithQueries>
    {({
      getAllPokemonQuery: { data, loading, error },
      setCurrentSearchPokemonMutation
    }: QueryProps): JSX.Element => {
      return (
        <PokemonSearch
          pokemon={getOr([], "pokemon", data)}
          setCurrentSearchPokemon={setCurrentSearchPokemonMutation}
          loading={loading}
          error={error}
        />
      );
    }}
  </WithQueries>
);

export default PokemonSearchContainer;
