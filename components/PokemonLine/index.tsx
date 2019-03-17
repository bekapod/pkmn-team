import React, { PureComponent } from "react";
import styled from "styled-components/macro";
import { formatPokemonName, sortTypes } from "../../helpers/general";
import { getTypeGradient } from "../../helpers/gradients";
import * as variables from "../../helpers/variables";
import { Pokemon, Type } from "../../types"; // eslint-disable-line import/named
import InlineList from "../InlineList";
import TypeTag from "../TypeTag";
import { media } from "../../helpers/media";

interface Props {
  pokemon: Pokemon;
  outdent: number;
  compact: boolean;
}

interface RowProps {
  outdent: number;
  compact: boolean;
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
    left: ${({ outdent }: RowProps) => `-${outdent}px`};
    display: block;
    width: ${({ outdent }: RowProps) => `calc(100% + (${outdent}px * 2))`};
    height: ${variables.spacing.sm}px;
    background-image: ${({ types }: RowProps) => getTypeGradient(types)};
  }

  ${media.mediumOnly`
    ${({ compact }: RowProps) =>
      compact
        ? `
          flex-direction: column;
          padding: ${variables.spacing.md}px;
          height: ${variables.spacing.lg * 6}px;
          align-items: flex-start;
        `
        : ""}
  `}
`;

const RowImage = styled.img`
  width: ${variables.spacing.xl}px;
  height: ${variables.spacing.xl}px;
  margin-right: ${variables.spacing.md}px;

  ${media.mediumOnly`
    ${({ compact }: RowProps) =>
      compact
        ? `
        margin-right: 0;
        align-self: center;
      `
        : ""}
  `}
`;

const RowTitle = styled.div`
  margin-bottom: ${variables.spacing.xs}px;
  font-weight: 700;
  line-height: 1;
`;

class PokemonLine extends PureComponent<Props> {
  public static defaultProps = {
    outdent: 0,
    compact: false,
    pokemon: {}
  };

  public render(): JSX.Element {
    const { pokemon, compact, ...props } = this.props;
    const { pokedexId, name, types, sprite } = pokemon;

    return (
      <Row types={types} compact={compact} {...props}>
        <RowImage
          src={`/static/sprites/${sprite}`}
          alt={`${name} sprite`}
          compact={compact}
        />
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
