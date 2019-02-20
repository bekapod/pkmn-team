import { ApolloError } from "apollo-client";
import { get, getOr, size } from "lodash/fp";
import React, { PureComponent } from "react";
import { FixedSizeList, FixedSizeList as List } from "react-window";
import { css } from "styled-components/macro";
import * as variables from "../../helpers/variables";
import { IPokemon } from "../../types";
import Autocomplete, { AutocompleteDropdown } from "../Autocomplete";
import CenteredRow from "../CenteredRow";
import ErrorMessage from "../ErrorMessage";
import GiantInput from "../GiantInput";
import LoadingIcon from "../LoadingIcon";
import PokemonLine from "../PokemonLine";

interface IProps {
  setCurrentSearchPokemon: ({
    variables: { pokemon }
  }: {
    variables: { pokemon: IPokemon };
  }) => void;
  pokemon: IPokemon[];
  loading?: boolean;
  error?: ApolloError;
}

interface IState {
  filteredList?: IPokemon[];
  highlightedIndex: number;
  inputValue: string;
}

const itemHeight = variables.spacing.xxl;

const resultItem = (
  pokemon: IPokemon[],
  highlightedIndex: number,
  onClick: any
) => ({ index, style, ...itemProps }: { index: number; style: any }) => {
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

class PokemonSearch extends PureComponent<IProps, IState> {
  public listContainer: React.RefObject<FixedSizeList> = React.createRef();

  public state = {
    highlightedIndex: 0,
    inputValue: ""
  };

  constructor(props: IProps) {
    super(props);

    this.keyboardNavigation = this.keyboardNavigation.bind(this);
    this.setInputValue = this.setInputValue.bind(this);
    this.onResultClick = this.onResultClick.bind(this);
  }

  public componentDidMount() {
    if (this.listContainer.current) {
      this.listContainer.current.scrollToItem(
        this.state.highlightedIndex,
        "center"
      );
    }
  }

  public componentDidUpdate() {
    if (this.listContainer.current) {
      this.listContainer.current.scrollToItem(
        this.state.highlightedIndex,
        "center"
      );
    }
  }

  public keyboardNavigation(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      const pokemon = get(
        ["filteredList", this.state.highlightedIndex],
        this.state
      );

      if (pokemon) {
        this.props.setCurrentSearchPokemon({ variables: { pokemon } });
      }

      return;
    }

    let newHighlightedIndex = 0;

    if (["ArrowUp", "ArrowDown"].includes(e.key)) {
      if (e.key === "ArrowUp") {
        if (this.state.highlightedIndex !== 0) {
          newHighlightedIndex = this.state.highlightedIndex - 1;
        }
      }

      if (e.key === "ArrowDown") {
        if (
          this.state.highlightedIndex <
          size(getOr(this.props.pokemon, "filteredList", this.state))
        ) {
          newHighlightedIndex = this.state.highlightedIndex + 1;
        }
      }

      this.setState(() => ({
        highlightedIndex: newHighlightedIndex
      }));
    }
  }

  public setInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    this.setState(() => ({
      filteredList: this.props.pokemon.filter(({ name }) =>
        name.includes(value)
      ),
      highlightedIndex: 0,
      inputValue: value
    }));
  }

  public onResultClick(pokemon: IPokemon, index: number) {
    this.setState(() => {
      this.props.setCurrentSearchPokemon({ variables: { pokemon } });
      return {
        highlightedIndex: index
      };
    });
  }

  public render() {
    if (this.props.loading) {
      return (
        <CenteredRow stackVertically={true}>
          <LoadingIcon spinner={true} />
        </CenteredRow>
      );
    }

    if (!this.props.loading && this.props.error) {
      return (
        <CenteredRow stackVertically={true}>
          <ErrorMessage>{this.props.error.message}</ErrorMessage>
        </CenteredRow>
      );
    }

    return (
      <Autocomplete>
        <GiantInput
          arial-label="Find Pokemon by name"
          placeholder="Find by name"
          css={css`
            max-width: none;
          `}
          value={this.state.inputValue}
          onKeyDown={this.keyboardNavigation}
          onChange={this.setInputValue}
        />
        <AutocompleteDropdown>
          <List
            ref={this.listContainer}
            height={itemHeight * 5}
            itemSize={itemHeight}
            itemCount={size(
              getOr(this.props.pokemon, "filteredList", this.state)
            )}
            width={500}
          >
            {resultItem(
              getOr(this.props.pokemon, "filteredList", this.state),
              this.state.highlightedIndex,
              this.onResultClick
            )}
          </List>
        </AutocompleteDropdown>
      </Autocomplete>
    );
  }
}

export default PokemonSearch;
