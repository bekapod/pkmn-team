/* eslint-disable @typescript-eslint/no-empty-function */
import { FunctionComponent } from 'react';
import styled from 'styled-components/macro';
import { Pokemon, Moves, Team_Member } from '~/generated/graphql';
import { formatPokemonName, sortBySlug } from '~/lib/general';
import { CardContent, CardHeader, CardWrapper, CardHeading } from '../Card';
import { InlineList } from '../InlineList';
import { TypeTag } from '../TypeTag';
import { MoveList } from '../MoveList';

export type PokemonCardProps = {
  teamMember?: Team_Member;
  pokemon: Pokemon;
  moves?: Moves[];
  renderCardActions?: () => JSX.Element;
};

const PokemonCardContent = styled(CardContent)`
  padding: var(--spacing-lg) 0;
  align-items: center;
`;

const PokemonCardSprite = styled.img`
  height: calc(var(--spacing-lg) * 3);
`;

const PokemonCardActions = styled.div`
  margin-top: var(--spacing-lg);
`;

export const PokemonCard: FunctionComponent<PokemonCardProps> = ({
  teamMember,
  pokemon,
  moves = [],
  renderCardActions
}) => {
  const { pokedex_id, types, name, sprite } = pokemon;
  const actualTypes = types.map(({ type }) => type);

  return (
    <CardWrapper data-testid={`pokemon-${pokemon.pokedex_id}`}>
      <CardHeader types={actualTypes}>
        <CardHeading>{formatPokemonName(pokemon)}</CardHeading>
      </CardHeader>

      <PokemonCardContent>
        <PokemonCardSprite src={`/sprites/${sprite}`} alt={`${name} sprite`} />

        <InlineList>
          {sortBySlug(actualTypes).map(type => (
            <li
              key={`${
                teamMember ? `Member: ${teamMember.id}` : ''
              } Pokemon: ${pokedex_id}, Type: ${type.slug}`}
            >
              <TypeTag type={type.slug}>{type.name}</TypeTag>
            </li>
          ))}
        </InlineList>

        <MoveList
          moves={moves}
          addMoveToTeamMember={() => {}}
          removeMoveFromTeamMember={() => {}}
        />

        {renderCardActions ? (
          <PokemonCardActions>{renderCardActions()}</PokemonCardActions>
        ) : null}
      </PokemonCardContent>
    </CardWrapper>
  );
};
