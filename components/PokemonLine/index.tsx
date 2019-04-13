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

interface RowImageProps {
  compact: boolean;
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
    left: ${({ outdent }: RowProps): string => `-${outdent}px`};
    display: block;
    width: ${({ outdent }: RowProps): string =>
      `calc(100% + (${outdent}px * 2))`};
    height: ${variables.spacing.sm}px;
    background-image: ${({ types }: RowProps): string =>
      getTypeGradient(types)};
  }

  ${media.mediumOnly`
    ${({ compact }: RowProps): string =>
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
    ${({ compact }: RowImageProps): string =>
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
            {sortTypes(types).map(
              (type: Type): JSX.Element => (
                <li key={`Pokemon: ${pokedexId}, Type: ${type.slug}`}>
                  <TypeTag type={type.slug}>{type.name}</TypeTag>
                </li>
              )
            )}
          </InlineList>
        </div>
      </Row>
    );
  }
}

export default PokemonLine;
