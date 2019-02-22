import { getOr } from "lodash/fp";
import React from "react";
import { adopt } from "react-adopt";
import { Mutation, OperationVariables, Query, QueryResult } from "react-apollo";
import PokemonSearch from "../../components/PokemonSearch";
import { setCurrentSearchPokemon } from "../../mutations/search";
import { getAllPokemon } from "../../queries/pokemon";
import { Pokemon } from "../../types";

interface QueryProps {
  getAllPokemonQuery: QueryResult<
    { allPokemon: Pokemon[] },
    OperationVariables
  >;
  setCurrentSearchPokemonMutation: ({
    variables: { pokemon }
  }: {
    variables: { pokemon: Pokemon };
  }) => void;
}

const queries = {
  getAllPokemonQuery: ({ render }: any) => (
    <Query query={getAllPokemon}>{render}</Query>
  )
};

const mutations = {
  setCurrentSearchPokemonMutation: ({ render }: any) => (
    <Mutation mutation={setCurrentSearchPokemon}>{render}</Mutation>
  )
};

const WithQueries = adopt({ ...queries, ...mutations });

const PokemonSearchContainer = (): JSX.Element => (
  <WithQueries>
    {({
      getAllPokemonQuery: { data, loading, error },
      setCurrentSearchPokemonMutation
    }: QueryProps) => {
      return (
        <PokemonSearch
          pokemon={getOr([], "allPokemon", data)}
          setCurrentSearchPokemon={setCurrentSearchPokemonMutation}
          loading={loading}
          error={error}
        />
      );
    }}
  </WithQueries>
);

export default PokemonSearchContainer;
