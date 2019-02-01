import { ApolloError } from "apollo-client";
import { size } from "lodash/fp";
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
  pokemon: IPokemon[];
  highlightedIndex: number;
  inputValue?: string;
  filteredList: IPokemon[];
  loading?: boolean;
  error?: ApolloError;
  setCurrentSelection: (pokemon: IPokemon) => void;
  setHighlightedIndex: (index: number) => void;
  setInputValue: (value: string) => void;
  setUnfilteredList: (pokemon: IPokemon[]) => void;
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
    onClick: () => onClick(pkmn),
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

class PokemonSearch extends PureComponent<IProps> {
  public listContainer: React.RefObject<FixedSizeList> = React.createRef();

  constructor(props: IProps) {
    super(props);

    this.keyboardNavigation = this.keyboardNavigation.bind(this);
    this.setInputValue = this.setInputValue.bind(this);
  }

  public componentWillMount() {
    if (!this.props.loading) {
      this.props.setUnfilteredList(this.props.pokemon);
      this.props.setInputValue("");
    }
  }

  public componentDidMount() {
    if (this.listContainer.current) {
      this.listContainer.current.scrollToItem(
        this.props.highlightedIndex,
        "center"
      );
    }
  }

  public componentDidUpdate(prevProps: IProps) {
    if (prevProps.loading && !this.props.loading) {
      this.props.setUnfilteredList(this.props.pokemon);
      this.props.setInputValue("");
    }

    if (this.listContainer.current) {
      this.listContainer.current.scrollToItem(
        this.props.highlightedIndex,
        "center"
      );
    }
  }

  public keyboardNavigation(e: React.KeyboardEvent) {
    const { highlightedIndex } = this.props;

    if (e.key === "Enter") {
      this.props.setCurrentSelection(this.props.filteredList[highlightedIndex]);
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
        if (highlightedIndex < size(this.props.filteredList)) {
          newHighlightedIndex = highlightedIndex + 1;
        }
      }

      this.props.setHighlightedIndex(newHighlightedIndex);
    }
  }

  public setInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    this.props.setHighlightedIndex(0);
    this.props.setInputValue(value);
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
          value={this.props.inputValue || ""}
          onKeyDown={this.keyboardNavigation}
          onChange={this.setInputValue}
        />
        <AutocompleteDropdown>
          <List
            ref={this.listContainer}
            height={itemHeight * 5}
            itemSize={itemHeight}
            itemCount={size(this.props.filteredList)}
            width={500}
          >
            {resultItem(
              this.props.filteredList,
              this.props.highlightedIndex,
              this.props.setCurrentSelection
            )}
          </List>
        </AutocompleteDropdown>
      </Autocomplete>
    );
  }
}

export default PokemonSearch;
