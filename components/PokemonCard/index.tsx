import React, { ReactNode, ReactNodeArray } from "react";
import styled from "styled-components/macro";
import { formatPokemonName, sortTypes } from "../../helpers/general";
import * as variables from "../../helpers/variables";
import { Pokemon, Type } from "../../types"; // eslint-disable-line import/named
import { CardContent, CardHeader, CardWrapper } from "../Card";
import CardHeading from "../CardHeading";
import InlineList from "../InlineList";
import TypeTag from "../TypeTag";

interface Props {
  memberId?: string;
  pokemon: Pokemon;
  renderCardActions?: () => ReactNode | ReactNodeArray;
}

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

const PokemonCard = ({
  memberId,
  pokemon,
  renderCardActions
}: Props): JSX.Element => {
  const { pokedexId, types, name, sprite } = pokemon;

  return (
    <CardWrapper data-testid={`pokemon-${pokemon.id}`}>
      <CardHeader types={types}>
        <CardHeading>{formatPokemonName(pokemon)}</CardHeading>
      </CardHeader>

      <PokemonCardContent>
        <PokemonCardSprite
          src={`/static/sprites/${sprite}`}
          alt={`${name} sprite`}
        />

        <InlineList>
          {sortTypes(types).map((type: Type) => (
            <li
              key={`${
                memberId ? `Member: ${memberId}` : ""
              } Pokemon: ${pokedexId}, Type: ${type.slug}`}
            >
              <TypeTag type={type.slug}>{type.name}</TypeTag>
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

export default PokemonCard;
