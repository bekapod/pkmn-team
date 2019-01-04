// @flow
import React from "react";
import styled from "styled-components/macro";
import { CardWrapper, CardHeader, CardContent } from "../Card";
import CardHeading from "../CardHeading";
import InlineList from "../InlineList";
import TypeTag from "../TypeTag";
import { formatPokemonName, sortTypes } from "../../helpers/general";
import * as variables from "../../helpers/variables";
import type { Pokemon, Type } from "../../types";

type Props = {
  memberId?: string,
  pokemon: Pokemon,
  renderCardActions?: () => React.ChildrenArray<React.Element<*>>
};

const PokemonCardContent = styled(CardContent)`
  padding: ${variables.spacing.lg}px 0;
  align-items: center;
`;

const PokemonCardSprite = styled.img`
  height: calc(${variables.spacing.lg}px * 3);
`;

const PokemonCardActions = styled.div`
  margin-top: ${variables.spacing.lg}px;
`;

const PokemonCard = ({ memberId, pokemon, renderCardActions }: Props) => {
  const { pokedexId, types = [], name, sprite } = pokemon;

  return (
    <CardWrapper>
      <CardHeader types={types}>
        <CardHeading>{formatPokemonName(pokemon)}</CardHeading>
      </CardHeader>

      <PokemonCardContent>
        <PokemonCardSprite src={`/sprites/${sprite}`} alt={`${name} sprite`} />

        <InlineList>
          {sortTypes(types).map((type: Type) => (
            <li
              key={`${
                memberId ? `Member: ${memberId}` : ""
              } Pokemon: ${pokedexId}, Type: ${type}`}
            >
              <TypeTag type={type}>{type}</TypeTag>
            </li>
          ))}
        </InlineList>

        {renderCardActions ? (
          <PokemonCardActions>{renderCardActions()}</PokemonCardActions>
        ) : null}
      </PokemonCardContent>
    </CardWrapper>
  );
};

PokemonCard.defaultProps = {
  memberId: undefined,
  renderCardActions: undefined
};

export default PokemonCard;
