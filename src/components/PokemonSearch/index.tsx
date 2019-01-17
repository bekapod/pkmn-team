import Downshift from "downshift";
import { toLower } from "lodash/fp";
import React from "react";
import { capitalizePokemonName } from "../../helpers/general";
import * as variables from "../../helpers/variables";
import { IPokemon } from "../../types";
import Autocomplete, { AutocompleteDropdown } from "../Autocomplete";
import GiantInput from "../GiantInput";
import PokemonLine from "../PokemonLine";

interface IProps {
  pokemon: IPokemon[];
  setCurrentSearchPokemon: (pokemon: IPokemon) => void;
}

const stateReducer = (state: any, changes: any) => {
  console.log(changes);
  switch (changes.type) {
    case Downshift.stateChangeTypes.clickItem:
    case Downshift.stateChangeTypes.mouseUp:
    case Downshift.stateChangeTypes.keyDownEnter:
    case Downshift.stateChangeTypes.keyDownEscape:
      return {
        ...changes,
        inputValue: state.inputValue
      };
    default:
      return changes;
  }
};

const PokemonSearch = ({ pokemon, setCurrentSearchPokemon }: IProps) => {
  const itemToString = (pkmn: IPokemon) => capitalizePokemonName(pkmn);

  return (
    <Downshift
      itemToString={itemToString}
      defaultIsOpen={true}
      stateReducer={stateReducer}
      onChange={setCurrentSearchPokemon}
    >
      {({
        getRootProps,
        getInputProps,
        getMenuProps,
        getItemProps,
        isOpen,
        inputValue,
        highlightedIndex
      }) => (
        <Autocomplete {...getRootProps()}>
          <GiantInput
            {...getInputProps()}
            arial-label="Find a Pokemon"
            placeholder="Find a Pokemon"
          />
          {isOpen ? (
            <AutocompleteDropdown {...getMenuProps()}>
              {pokemon
                .filter(
                  pkmn => !inputValue || pkmn.name.includes(toLower(inputValue))
                )
                .map((pkmn, index) => (
                  <div
                    data-testid={`autocomplete-result-${pkmn.pokedexId}`}
                    {...getItemProps({
                      index,
                      item: pkmn,
                      key: pkmn.pokedexId,
                      style: {
                        backgroundColor:
                          highlightedIndex === index
                            ? variables.colors.grayLight
                            : variables.colors.white
                      }
                    })}
                  >
                    <PokemonLine pokemon={pkmn} />
                  </div>
                ))}
            </AutocompleteDropdown>
          ) : null}
        </Autocomplete>
      )}
    </Downshift>
  );
};

export default PokemonSearch;
