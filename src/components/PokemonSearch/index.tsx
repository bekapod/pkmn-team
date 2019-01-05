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
  currentSearchPokemon?: IPokemon;
  setCurrentSearchPokemon: (pokemon: IPokemon) => void;
}

const PokemonSearch = ({
  pokemon,
  currentSearchPokemon,
  setCurrentSearchPokemon
}: IProps) => {
  const onChange = (selectedPkmn: IPokemon) =>
    setCurrentSearchPokemon(selectedPkmn);
  const itemToString = (pkmn: IPokemon) => capitalizePokemonName(pkmn);
  return (
    <div>
      <Downshift onChange={onChange} itemToString={itemToString}>
        {({
          getRootProps,
          getInputProps,
          getItemProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem
        }) => (
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
                    pkmn =>
                      !inputValue || pkmn.name.includes(toLower(inputValue))
                  )
                  .map((pkmn, index) => (
                    <div
                      {...getItemProps({
                        index,
                        item: pkmn,
                        key: pkmn.pokedexId,
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
};

export default PokemonSearch;
