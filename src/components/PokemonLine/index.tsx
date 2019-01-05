import React, { PureComponent } from "react";
import styled from "styled-components/macro";
import { formatPokemonName, sortTypes } from "../../helpers/general";
import { getTypeGradient } from "../../helpers/gradients";
import * as variables from "../../helpers/variables";
import { IPokemon, Type } from "../../types";
import InlineList from "../InlineList";
import TypeTag from "../TypeTag";

interface IProps {
  pokemon: IPokemon;
  outdent: number;
}

interface IRowProps {
  outdent: number;
  types: Type[];
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
    left: ${({ outdent }: IRowProps) => `-${outdent}px`};
    display: block;
    width: ${({ outdent }: IRowProps) => `calc(100% + (${outdent}px * 2))`};
    height: ${variables.spacing.sm}px;
    background-image: ${({ types }: IRowProps) => getTypeGradient(types)};
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

class PokemonLine extends PureComponent<IProps> {
  public static defaultProps = {
    outdent: 0,
    pokemon: {}
  };

  public render() {
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
