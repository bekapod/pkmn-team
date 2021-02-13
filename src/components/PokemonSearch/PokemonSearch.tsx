import {
  ChangeEvent,
  KeyboardEvent,
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
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
  isLoading?: boolean;
  error?: CombinedError;
};

const resultItem = (
  pokemon: Pokemon[],
  highlightedIndex: number,
  onClick: (pkmn: Pokemon, index: number) => void
) => ({ index, style, isScrolling, ...itemProps }: ListChildComponentProps) => {
  const pkmn = pokemon[index];
  const isHighlighted = index === highlightedIndex;
  const props = {
    ...itemProps,
    onClick: (): void => onClick(pkmn, index),
    style: {
      ...style,
      backgroundColor: isHighlighted
        ? 'var(--colors-yellow-vivid-100)'
        : 'initial',
      top: `calc(${style?.top}px + var(--spacing-1))`
    }
  };

  return (
    <PokemonLine
      aria-selected={index === highlightedIndex}
      data-testid={`autocomplete-result-${pkmn.pokedex_id}`}
      pokemon={pkmn}
      {...props}
    />
  );
};

export const PokemonSearch: FunctionComponent<PokemonSearchProps> = ({
  setCurrentSearchPokemon,
  pokemon,
  isLoading,
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

  const onResultClick = useCallback(
    (pkmn: Pokemon, index: number) => {
      setCurrentSearchPokemon(pkmn);
      setHighlightedIndex(index);
    },
    [setCurrentSearchPokemon]
  );

  const updateList = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget;
      setFilteredList(pokemon.filter(({ name }) => name.includes(value)));
      setHighlightedIndex(0);
      setInputValue(value);
    },
    [pokemon]
  );

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
    [filteredList, highlightedIndex, setCurrentSearchPokemon]
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
    <Autocomplete>
      <GiantInput
        aria-label="Find Pokemon by name"
        placeholder="Find by name"
        isFullWidth
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
          className="w-full!"
        >
          {resultItem(filteredList, highlightedIndex, onResultClick)}
        </List>
      </AutocompleteDropdown>
    </Autocomplete>
  );
};
