import { FunctionComponent } from 'react';
import styled from 'styled-components/macro';
import { Pokemon, Type } from '~/generated/graphql';
import { formatPokemonName, sortBySlug } from '~lib/general';
import { getTypeGradient } from '~lib/gradients';
import { media } from '~lib/media';
import { InlineList } from '../InlineList';
import { TypeTag } from '../TypeTag';

export type PokemonLineProps = {
  pokemon: Pokemon;
  outdent: string;
  compact: boolean;
};

interface RowProps {
  outdent: string;
  compact: boolean;
  types: Type[];
}

interface RowImageProps {
  compact: boolean;
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
  ${media.mediumOnly`
    ${({ compact }) =>
      compact
        ? `
          flex-direction: column;
          padding: var(--spacing-md);
          height: calc(var(--spacing-lg) * 6);
          align-items: flex-start;
        `
        : ''}
  `}
`;

const RowImage = styled.img<RowImageProps>`
  width: var(--spacing-xl);
  height: var(--spacing-xl);
  margin-right: var(--spacing-md);
  ${media.mediumOnly`
    ${({ compact }): string =>
      compact
        ? `
        margin-right: 0;
        align-self: center;
      `
        : ''}
  `}
`;

const RowTitle = styled.div`
  margin-bottom: var(--spacing-xs);
  font-weight: 700;
  line-height: 1;
`;

export const PokemonLine: FunctionComponent<PokemonLineProps> = ({
  pokemon,
  compact,
  ...props
}) => {
  const { pokedexId, name, types, sprite } = pokemon;

  return (
    <Row types={types} compact={compact} {...props}>
      <RowImage
        src={`/sprites/${sprite}`}
        alt={`${name} sprite`}
        compact={compact}
      />
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
