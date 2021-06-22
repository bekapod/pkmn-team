import { FunctionComponent, useCallback } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';
import { Autocomplete, AutocompleteDropdown } from '../Autocomplete';
import { ConnectedTypeRefinementList } from '../TypeRefinementList';
import { ConnectedSearchBox } from '../SearchBox';
import { ConnectedInfinitePokemon } from '../InfinitePokemon';
import { PokemonLineProps } from '../PokemonLine';

export type PokemonSearchProps = {
  setCurrentSearchPokemon: (pokemon: PokemonLineProps['pokemon']) => void;
};

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID as string,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY as string
);

export const PokemonSearch: FunctionComponent<PokemonSearchProps> = ({
  setCurrentSearchPokemon
}) => {
  const onResultClick = useCallback(
    (pkmn: PokemonLineProps['pokemon']) => {
      setCurrentSearchPokemon(pkmn);
    },
    [setCurrentSearchPokemon]
  );

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={process.env.NEXT_PUBLIC_ALGOLIA_POKEMON_INDEX as string}
    >
      <Autocomplete>
        <ConnectedSearchBox
          aria-label="Find Pokemon by name"
          placeholder="Find by name"
          isFullWidth
        />
        <ConnectedTypeRefinementList
          attribute="types.type.name"
          limit={50}
          operator="and"
        />
        <AutocompleteDropdown>
          <ConnectedInfinitePokemon onClick={onResultClick} />
        </AutocompleteDropdown>
        <div className="flex justify-end mt-3">
          <img src="/search-by-algolia-light-background.svg" />
        </div>
      </Autocomplete>
    </InstantSearch>
  );
};
