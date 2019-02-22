import { ApolloError } from "apollo-client";
import { get, getOr, size } from "lodash/fp";
import React, { PureComponent } from "react";
import { FixedSizeList, FixedSizeList as List } from "react-window";
import * as variables from "../../helpers/variables";
import { Pokemon } from "../../types";
import Autocomplete, { AutocompleteDropdown } from "../Autocomplete";
import CenteredRow from "../CenteredRow";
import ErrorMessage from "../ErrorMessage";
import GiantInput from "../GiantInput";
import LoadingIcon from "../LoadingIcon";
import PokemonLine from "../PokemonLine";

interface Props {
  setCurrentSearchPokemon: ({
    variables: { pokemon }
  }: {
    variables: { pokemon: Pokemon };
  }) => void;
  pokemon: Pokemon[];
  loading?: boolean;
  error?: ApolloError;
}

interface State {
  filteredList?: Pokemon[];
  highlightedIndex: number;
  inputValue: string;
}

const itemHeight = variables.spacing.xxl;

const resultItem = (
  pokemon: Pokemon[],
  highlightedIndex: number,
  onClick: (pokemon: Pokemon, index: number) => void
): (({ index, style }: { index: number; style: any }) => JSX.Element) => ({
  index,
  style,
  ...itemProps
}: {
  index: number;
  style: any;
}): JSX.Element => {
  const pkmn = pokemon[index];
  const isHighlighted = index === highlightedIndex;
  const props = {
    ...itemProps,
    onClick: () => onClick(pkmn, index),
    style: {
      ...style,
      backgroundColor: isHighlighted ? variables.colors.grayLight : "initial",
      top: `calc(${style.top}px + ${variables.spacing.xs}px)`
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

class PokemonSearch extends PureComponent<Props, State> {
  public listContainer: React.RefObject<FixedSizeList> = React.createRef();

  public state = {
    highlightedIndex: 0,
    inputValue: ""
  };

  public constructor(props: Props) {
    super(props);

    this.keyboardNavigation = this.keyboardNavigation.bind(this);
    this.setInputValue = this.setInputValue.bind(this);
    this.onResultClick = this.onResultClick.bind(this);
  }

  public componentDidMount(): void {
    if (this.listContainer.current) {
      const { highlightedIndex } = this.state;
      this.listContainer.current.scrollToItem(highlightedIndex, "center");
    }
  }

  public componentDidUpdate(): void {
    if (this.listContainer.current) {
      const { highlightedIndex } = this.state;
      this.listContainer.current.scrollToItem(highlightedIndex, "center");
    }
  }

  public onResultClick(pokemon: Pokemon, index: number): void {
    this.setState(() => {
      const { setCurrentSearchPokemon } = this.props;
      setCurrentSearchPokemon({ variables: { pokemon } });
      return {
        highlightedIndex: index
      };
    });
  }

  public setInputValue(e: React.ChangeEvent<HTMLInputElement>): void {
    const { pokemon } = this.props;
    const { value } = e.target;

    this.setState(() => ({
      filteredList: pokemon.filter(({ name }) => name.includes(value)),
      highlightedIndex: 0,
      inputValue: value
    }));
  }

  public keyboardNavigation(e: React.KeyboardEvent): void {
    const { highlightedIndex } = this.state;
    const { pokemon, setCurrentSearchPokemon } = this.props;

    if (e.key === "Enter") {
      const selectedPokemon = get(
        ["filteredList", highlightedIndex],
        this.state
      );

      if (pokemon) {
        setCurrentSearchPokemon({ variables: { pokemon: selectedPokemon } });
      }

      return;
    }

    let newHighlightedIndex = 0;

    if (["ArrowUp", "ArrowDown"].includes(e.key)) {
      if (e.key === "ArrowUp") {
        if (highlightedIndex !== 0) {
          newHighlightedIndex = highlightedIndex - 1;
        }
      }

      if (e.key === "ArrowDown") {
        if (
          highlightedIndex < size(getOr(pokemon, "filteredList", this.state))
        ) {
          newHighlightedIndex = highlightedIndex + 1;
        }
      }

      this.setState(() => ({
        highlightedIndex: newHighlightedIndex
      }));
    }
  }

  public render(): JSX.Element {
    const { pokemon, loading, error } = this.props;
    const { inputValue, highlightedIndex } = this.state;

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
          arial-label="Find Pokemon by name"
          placeholder="Find by name"
          fullWidth
          value={inputValue}
          onKeyDown={this.keyboardNavigation}
          onChange={this.setInputValue}
        />
        <AutocompleteDropdown>
          <List
            ref={this.listContainer}
            height={itemHeight * 5}
            itemSize={itemHeight}
            itemCount={size(getOr(pokemon, "filteredList", this.state))}
            width={500}
          >
            {resultItem(
              getOr(pokemon, "filteredList", this.state),
              highlightedIndex,
              this.onResultClick
            )}
          </List>
        </AutocompleteDropdown>
      </Autocomplete>
    );
  }
}

export default PokemonSearch;
