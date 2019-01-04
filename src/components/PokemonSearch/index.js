// @flow
import React from "react";
import Downshift from "downshift";
import { toLower } from "ramda";
import PokemonLine from "../PokemonLine";
import GiantInput from "../GiantInput";
import Autocomplete, { AutocompleteDropdown } from "../Autocomplete";
import * as variables from "../../helpers/variables";
import { capitalizePokemonName } from "../../helpers/general";
import type { Pokemon } from "../../types";

type Props = {
  pokemon: Array<Pokemon>,
  currentSearchPokemon: Pokemon,
  setCurrentSearchPokemon: (pokemon: Pokemon) => void
};

type DownshiftProps = {
  getRootProps: ({ refKey: string }) => { [key: string]: * },
  getInputProps: () => { [key: string]: * },
  getItemProps: ({ [key: string]: * }) => { [key: string]: * },
  isOpen: boolean,
  inputValue: string,
  highlightedIndex: number,
  selectedItem: Pokemon
};

const PokemonSearch = ({
  pokemon,
  currentSearchPokemon,
  setCurrentSearchPokemon
}: Props) => (
  <div>
    <Downshift
      onChange={(selectedPkmn: Pokemon) =>
        setCurrentSearchPokemon(selectedPkmn)
      }
      defaultInputValue={
        currentSearchPokemon && capitalizePokemonName(currentSearchPokemon)
      }
      itemToString={(pkmn: Pokemon) => capitalizePokemonName(pkmn)}
    >
      {({
        getRootProps,
        getInputProps,
        getItemProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem
      }: DownshiftProps) => (
        <Autocomplete {...getRootProps()}>
          <GiantInput
            {...getInputProps()}
            arial-label="Choose a Pokemon"
            placeholder="Choose a Pokemon"
          />
          {isOpen ? (
            <AutocompleteDropdown>
              {pokemon
                .filter(
                  pkmn => !inputValue || pkmn.name.includes(toLower(inputValue))
                )
                .map((pkmn, index) => (
                  <div
                    {...getItemProps({
                      key: pkmn.pokedexId,
                      index,
                      item: pkmn,
                      style: {
                        backgroundColor:
                          highlightedIndex === index
                            ? variables.colors.grayLight
                            : variables.colors.white,
                        fontWeight: selectedItem === pkmn ? "bold" : "normal"
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
  </div>
);

export default PokemonSearch;
