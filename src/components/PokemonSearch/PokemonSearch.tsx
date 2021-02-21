import { FunctionComponent, useCallback } from 'react';
import type { CombinedError } from 'urql';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';
import { PokemonFragmentFragment } from '~/generated/graphql';
import { Autocomplete, AutocompleteDropdown } from '../Autocomplete';
import { CenteredRow } from '../CenteredRow';
import { ErrorMessage } from '../ErrorMessage';
import { LoadingIcon } from '../LoadingIcon';
import { ConnectedTypeRefinementList } from '../TypeRefinementList';
import { ConnectedSearchBox } from '../SearchBox';
import { ConnectedInfinitePokemon } from '../InfinitePokemon';

export type PokemonSearchProps = {
  setCurrentSearchPokemon: (pokemon: PokemonFragmentFragment) => void;
  isLoading?: boolean;
  error?: CombinedError;
};

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID as string,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY as string
);

export const PokemonSearch: FunctionComponent<PokemonSearchProps> = ({
  setCurrentSearchPokemon,
  isLoading,
  error
}) => {
  const onResultClick = useCallback(
    (pkmn: PokemonFragmentFragment) => {
      setCurrentSearchPokemon(pkmn);
    },
    [setCurrentSearchPokemon]
  );

  if (isLoading) {
    return (
      <CenteredRow stackVertically>
        <LoadingIcon isSpinner />
      </CenteredRow>
    );
  }

  if (!isLoading && error) {
    return (
      <CenteredRow stackVertically>
        <ErrorMessage>{error.message}</ErrorMessage>
      </CenteredRow>
    );
  }

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
      </Autocomplete>
    </InstantSearch>
    // <Autocomplete>
    //   <GiantInput
    //     aria-label="Find Pokemon by name"
    //     placeholder="Find by name"
    //     isFullWidth
    //     value={inputValue}
    //     onKeyDown={keyboardNavigation}
    //     onChange={updateList}
    //   />
    //   <AutocompleteDropdown>
    //     <List
    //       ref={listContainer}
    //       height={itemHeight * 5}
    //       itemSize={itemHeight}
    //       itemCount={itemData.length}
    //       itemData={itemData}
    //       width={500}
    //       className="w-full!"
    //     >
    //       {Row}
    //     </List>
    //   </AutocompleteDropdown>
    // </Autocomplete>
  );
};
