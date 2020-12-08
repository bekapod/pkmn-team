import { FunctionComponent } from 'react';
import styled from 'styled-components/macro';
import { Pokemon, Type } from '~/generated/graphql';
import { formatPokemonName, sortBySlug } from '~lib/general';
import { getTypeGradient } from '~lib/gradients';
import { InlineList } from '../InlineList';
import { TypeTag } from '../TypeTag';

export type PokemonLineProps = {
  pokemon: Pokemon;
  outdent?: string;
};

interface RowProps {
  outdent?: string;
  types: Type[];
}

const Row = styled.div<RowProps>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: var(--spacing-xxl);

  &::before {
    content: '';
    position: absolute;
    top: calc(var(--spacing-sm) / 2 * -1);
    left: ${({ outdent }) => `-${outdent ?? 0}`};
    display: block;
    width: ${({ outdent }) => `calc(100% + (${outdent ?? 0}px * 2))`};
    height: var(--spacing-sm);
    background-image: ${({ types }) => getTypeGradient(types)};
  }
`;

const RowImage = styled.img`
  width: var(--spacing-xl);
  height: var(--spacing-xl);
  margin-right: var(--spacing-md);
`;

const RowTitle = styled.div`
  margin-bottom: var(--spacing-xs);
  font-weight: 700;
  line-height: 1;
`;

export const PokemonLine: FunctionComponent<PokemonLineProps> = ({
  pokemon,
  ...props
}) => {
  const { pokedexId, name, types, sprite } = pokemon;

  return (
    <Row types={types} {...props}>
      <RowImage src={`/sprites/${sprite}`} alt={`${name} sprite`} />
      <div>
        <RowTitle>{formatPokemonName(pokemon)}</RowTitle>
        <InlineList>
          {sortBySlug(types).map(
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
};
