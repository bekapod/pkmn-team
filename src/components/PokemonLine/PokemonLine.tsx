import type { ComponentPropsWithRef, FunctionComponent } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import type { PokemonFragment, PokemonTypeFragment } from '~/generated/graphql';
import {
  formatPokemonName,
  getPokemonSpriteUrl,
  sortBySlot
} from '~/lib/general';
import { getTypeGradient } from '~/lib/gradients';
import { InlineList } from '../InlineList';
import { TypeTag } from '../TypeTag';

export type PokemonLineProps = {
  pokemon: PokemonFragment;
  outdent?: string;
};

export const PokemonLine: FunctionComponent<
  ComponentPropsWithRef<'div'> & PokemonLineProps
> = ({ pokemon, outdent, style, className, ...props }) => {
  const { pokedexId, name, types } = pokemon;
  const sprite = getPokemonSpriteUrl(pokemon.sprite);
  const sortedTypes = sortBySlot(
    types.edges?.map(edge => ({ ...edge, slot: edge?.slot ?? 0 })) ?? []
  );

  return (
    <div
      className={classNames(
        'pokemon-line-template',
        'relative',
        'flex',
        'items-center',
        'h-10',
        className
      )}
      style={{
        ...style,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        '--outdent': outdent,
        '--type-gradient': getTypeGradient(
          sortedTypes
            .map(edge => edge?.node)
            .filter((node): node is PokemonTypeFragment => !!node)
        )
      }}
      {...props}
    >
      {sprite && (
        <Image src={sprite} alt={`${name} sprite`} width={72} height={72} />
      )}
      <div className="ml-4">
        <div
          className={classNames('mb-2', 'font-bold text-md', 'leading-none')}
        >
          {formatPokemonName(pokemon)}
        </div>
        <InlineList>
          {sortedTypes.map(({ node: type }) => (
            <li key={`Pokemon: ${pokedexId}, Type: ${type?.slug}`}>
              <TypeTag typeSlug={type?.slug}>{type?.name}</TypeTag>
            </li>
          ))}
        </InlineList>
      </div>
    </div>
  );
};
