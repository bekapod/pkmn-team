import { FunctionComponent } from 'react';
import styled from 'styled-components/macro';
import { Pokemon, Type } from '~/generated/graphql';
import { formatPokemonName, sortBySlug } from '~lib/general';
import { CardContent, CardHeader, CardWrapper, CardHeading } from '../Card';
import { InlineList } from '../InlineList';
import { TypeTag } from '../TypeTag';

export type PokemonCardProps = {
  memberId?: string;
  pokemon: Pokemon;
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
  memberId,
  pokemon,
  renderCardActions
}) => {
  const { pokedexId, types, name, sprite } = pokemon;

  return (
    <CardWrapper data-testid={`pokemon-${pokemon.pokedexId}`}>
      <CardHeader types={types}>
        <CardHeading>{formatPokemonName(pokemon)}</CardHeading>
      </CardHeader>

      <PokemonCardContent>
        <PokemonCardSprite src={`/sprites/${sprite}`} alt={`${name} sprite`} />

        <InlineList>
          {sortBySlug(types).map(
            (type: Type): JSX.Element => (
              <li
                key={`${
                  memberId ? `Member: ${memberId}` : ''
                } Pokemon: ${pokedexId}, Type: ${type.slug}`}
              >
                <TypeTag type={type.slug}>{type.name}</TypeTag>
              </li>
            )
          )}
        </InlineList>

        {renderCardActions ? (
          <PokemonCardActions>{renderCardActions()}</PokemonCardActions>
        ) : null}
      </PokemonCardContent>
    </CardWrapper>
  );
};
