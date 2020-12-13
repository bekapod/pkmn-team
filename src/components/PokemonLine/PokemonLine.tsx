import { FunctionComponent } from 'react';
import styled from 'styled-components/macro';
import { Pokemon, Pokemon_Type } from '~/generated/graphql';
import { formatPokemonName, sortBySlug } from '~/lib/general';
import { getTypeGradient } from '~/lib/gradients';
import { InlineList } from '../InlineList';
import { TypeTag } from '../TypeTag';

export type PokemonLineProps = {
  pokemon: Pick<
    Pokemon,
    'id' | 'pokedex_id' | 'name' | 'slug' | 'sprite' | 'types'
  >;
  outdent?: string;
};

interface RowProps {
  outdent?: string;
  types: Pokemon_Type[];
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
    left: ${({ outdent }) => `${`calc(${outdent} * -1)` ?? 0}`};
    display: block;
    width: ${({ outdent }) => `calc(100% + ${outdent ?? '0px'} * 2)`};
    height: var(--spacing-sm);
    background-image: ${({ types }) =>
      getTypeGradient(types.map(({ type }) => type))};
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
  const { pokedex_id, name, types, sprite } = pokemon;

  return (
    <Row types={types} {...props}>
      <RowImage src={`/sprites/${sprite}`} alt={`${name} sprite`} />
      <div>
        <RowTitle>{formatPokemonName(pokemon)}</RowTitle>
        <InlineList>
          {sortBySlug(types.map(({ type }) => type)).map(type => (
            <li key={`Pokemon: ${pokedex_id}, Type: ${type.slug}`}>
              <TypeTag type={type.slug}>{type.name}</TypeTag>
            </li>
          ))}
        </InlineList>
      </div>
    </Row>
  );
};
