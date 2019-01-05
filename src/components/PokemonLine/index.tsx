import React, { PureComponent } from "react";
import styled from "styled-components/macro";
import TypeTag from "../TypeTag";
import InlineList from "../InlineList";
import { getTypeGradient } from "../../helpers/gradients";
import * as variables from "../../helpers/variables";
import { sortTypes, formatPokemonName } from "../../helpers/general";
import { Pokemon, Type } from "../../types";

type Props = {
  pokemon: Pokemon,
  outdent: number
};

type RowProps = {
  outdent: number,
  types: Type[]
}

const Row = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: ${variables.spacing.xxl}px;

  &::before {
    content: "";
    position: absolute;
    top: calc(${variables.spacing.sm}px / 2 * -1);
    left: ${({ outdent }: RowProps) => `-${outdent}px`};
    display: block;
    width: ${({ outdent }: RowProps) => `calc(100% + (${outdent}px * 2))`};
    height: ${variables.spacing.sm}px;
    background-image: ${({ types }: RowProps) => getTypeGradient(types)};
  }
`;

const RowImage = styled.img`
  width: ${variables.spacing.xl}px;
  height: ${variables.spacing.xl}px;
  margin-right: ${variables.spacing.md}px;
`;

const RowTitle = styled.div`
  font-weight: 700;
`;

class PokemonLine extends PureComponent<Props> {
  static defaultProps = {
    pokemon: {},
    outdent: 0
  };

  render() {
    const { pokemon, outdent } = this.props;
    const { pokedexId, name, types = [], sprite } = pokemon;

    return (
      <Row types={types} outdent={outdent}>
        <RowImage src={`/sprites/${sprite}`} alt={`${name} sprite`} />
        <div>
          <RowTitle>{formatPokemonName(pokemon)}</RowTitle>
          <InlineList>
            {sortTypes(types).map((type: Type) => (
              <li key={`Pokemon: ${pokedexId}, Type: ${type}`}>
                <TypeTag type={type}>{type}</TypeTag>
              </li>
            ))}
          </InlineList>
        </div>
      </Row>
    );
  }
}

export default PokemonLine;
