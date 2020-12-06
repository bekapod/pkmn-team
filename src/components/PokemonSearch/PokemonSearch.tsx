import {
  ChangeEvent,
  KeyboardEvent,
  FunctionComponent,
  HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import { FixedSizeList as List } from 'react-window';
import type { CombinedError } from 'urql';
import { Pokemon } from '~/generated/graphql';
import { Autocomplete, AutocompleteDropdown } from '../Autocomplete';
import { CenteredRow } from '../CenteredRow';
import { ErrorMessage } from '../ErrorMessage';
import { GiantInput } from '../GiantInput';
import { LoadingIcon } from '../LoadingIcon';
import { PokemonLine } from '../PokemonLine';

export type PokemonSearchProps = {
  setCurrentSearchPokemon: (pokemon: Pokemon) => void;
  pokemon: Pokemon[];
  loading?: boolean;
  error?: CombinedError;
};

const resultItem = (
  pokemon: Pokemon[],
  highlightedIndex: number,
  onClick: (pkmn: Pokemon, index: number) => void
) => ({
  index,
  style,
  ...itemProps
}: {
  index: number;
  style: HTMLAttributes<HTMLElement>['style'];
}): JSX.Element => {
  const pkmn = pokemon[index];
  const isHighlighted = index === highlightedIndex;
  const props = {
    ...itemProps,
    onClick: (): void => onClick(pkmn, index),
    style: {
      ...style,
      backgroundColor: isHighlighted ? 'var(--color-gray-light)' : 'initial',
      top: `calc(${style?.top ?? 0}px + var(--spacing-xs))`
    }
  };

  return (
    <PokemonLine
      aria-selected={index === highlightedIndex}
      data-testid={`autocomplete-result-${pkmn.pokedexId}`}
      pokemon={pkmn}
      {...props}
    />
  );
};

export const PokemonSearch: FunctionComponent<PokemonSearchProps> = ({
  setCurrentSearchPokemon,
  pokemon,
  loading,
  error
}) => {
  const listContainer = useRef<List>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [filteredList, setFilteredList] = useState(pokemon);
  const itemHeight = 96;

  useEffect(() => {
    listContainer.current?.scrollToItem(highlightedIndex, 'center');
  }, [highlightedIndex]);

  const onResultClick = useCallback((pkmn: Pokemon, index: number) => {
    setCurrentSearchPokemon(pkmn);
    setHighlightedIndex(index);
  }, []);

  const updateList = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setFilteredList(pokemon.filter(({ name }) => name.includes(value)));
    setHighlightedIndex(0);
    setInputValue(value);
  }, []);

  const keyboardNavigation = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const selectedPokemon = filteredList[highlightedIndex];

        if (selectedPokemon) {
          setCurrentSearchPokemon(selectedPokemon);
        }

        return;
      }

      if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
        if (e.key === 'ArrowUp') {
          setHighlightedIndex(val => {
            if (val !== 0) return val - 1;
            return val;
          });
        }

        if (e.key === 'ArrowDown') {
          setHighlightedIndex(val => {
            if (val < filteredList.length) return val + 1;
            return val;
          });
        }
      }
    },
    []
  );

  if (loading) {
    return (
      <CenteredRow stackVertically>
        <LoadingIcon spinner />
      </CenteredRow>
    );
  }

  if (!loading && error) {
    return (
      <CenteredRow stackVertically>
        <ErrorMessage>{error.message}</ErrorMessage>
      </CenteredRow>
    );
  }

  return (
    <Autocomplete>
      <GiantInput
        aria-label="Find Pokemon by name"
        placeholder="Find by name"
        fullWidth
        value={inputValue}
        onKeyDown={keyboardNavigation}
        onChange={updateList}
      />
      <AutocompleteDropdown>
        <List
          ref={listContainer}
          height={itemHeight * 5}
          itemSize={itemHeight}
          itemCount={filteredList.length}
          width={500}
        >
          {resultItem(filteredList, highlightedIndex, onResultClick)}
        </List>
      </AutocompleteDropdown>
    </Autocomplete>
  );
};
