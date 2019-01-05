import React, { ReactNode, ReactNodeArray } from "react";
import styled from "styled-components/macro";
import { formatPokemonName, sortTypes } from "../../helpers/general";
import * as variables from "../../helpers/variables";
import { IPokemon, Type } from "../../types";
import { CardContent, CardHeader, CardWrapper } from "../Card";
import CardHeading from "../CardHeading";
import InlineList from "../InlineList";
import TypeTag from "../TypeTag";

interface IProps {
  memberId?: string;
  pokemon: IPokemon;
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

const PokemonCard = ({ memberId, pokemon, renderCardActions }: IProps) => {
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

export default PokemonCard;
