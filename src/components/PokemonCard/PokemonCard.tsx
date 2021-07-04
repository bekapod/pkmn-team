import { FunctionComponent, RefObject } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import {
  PokemonFragment,
  TeamMemberFragment,
  PokemonTypeFragment
} from '~/generated/graphql';
import {
  formatPokemonName,
  getPokemonSpriteUrl,
  sortBySlot
} from '~/lib/general';
import { CardContent, CardHeader, CardWrapper, CardHeading } from '../Card';
import { InlineList } from '../InlineList';
import { TypeTag } from '../TypeTag';
import { Label } from '../Label';
import { MoveList } from '../MoveList';
import { useContainerQuery } from '~/hooks/useContainerQuery';

export type PokemonCardProps = {
  teamMember?: TeamMemberFragment;
  pokemon: PokemonFragment;
  renderCardActions?: () => JSX.Element;
};

const query = {
  'is-compressed': {
    minWidth: 0,
    maxWidth: 500
  }
};

export const PokemonCard: FunctionComponent<PokemonCardProps> = ({
  teamMember,
  pokemon,
  renderCardActions
}) => {
  const [ref, className] = useContainerQuery<HTMLElement>(query);
  const { pokedexId, types, name } = pokemon;
  const sortedTypes = sortBySlot(
    types.edges?.map(edge => ({ ...edge, slot: edge?.slot ?? 0 })) ?? []
  );
  const actualTypes = sortedTypes
    .map(edge => edge?.node)
    .filter((node): node is PokemonTypeFragment => !!node);
  const stats = [
    pokemon.hp,
    pokemon.attack,
    pokemon.defense,
    pokemon.specialAttack,
    pokemon.specialDefense,
    pokemon.speed
  ];
  const highestStat = Math.max(...stats);
  const lowestStat = Math.min(...stats);
  const sprite = getPokemonSpriteUrl(pokemon.sprite);

  return (
    <CardWrapper
      data-testid={`pokemon-${pokemon.pokedexId}`}
      ref={ref as RefObject<HTMLElement>}
      className={classNames(className)}
    >
      <CardHeader types={actualTypes}>
        <CardHeading>{formatPokemonName(pokemon)}</CardHeading>
      </CardHeader>

      <CardContent className={classNames('py-6', 'items-center')}>
        {sprite && (
          <Image src={sprite} alt={`${name} sprite`} width={144} height={144} />
        )}

        <InlineList>
          {sortBySlot(
            types.edges?.map(edge => ({ ...edge, slot: edge?.slot ?? 0 })) ?? []
          ).map(({ node: type }) => (
            <li key={`Pokemon: ${pokedexId}, Type: ${type?.slug}`}>
              <TypeTag typeSlug={type?.slug}>{type?.name}</TypeTag>
            </li>
          ))}
        </InlineList>

        <p>{pokemon.description}</p>

        <dl
          className={classNames(
            'grid gap-y-1 gap-x-2',
            { 'grid-cols-2 grid-rows-3': className.includes('is-compressed') },
            { 'grid-cols-3 grid-rows-2': !className.includes('is-compressed') }
          )}
        >
          <div
            className={classNames('flex items-center py-2 px-3', {
              'bg-green-vivid-200':
                highestStat === pokemon.hp && highestStat !== lowestStat,
              'bg-red-vivid-100':
                lowestStat === pokemon.hp && highestStat !== lowestStat
            })}
          >
            <Label as="dt" className="mr-3">
              HP
            </Label>
            <dd
              className={classNames(
                'ml-auto',
                'text-indigo-800',
                'text-lg',
                'font-black'
              )}
            >
              {pokemon.hp}
            </dd>
          </div>
          <div
            className={classNames('flex items-center py-2 px-3', {
              'bg-green-vivid-200':
                highestStat === pokemon.attack && highestStat !== lowestStat,
              'bg-red-vivid-100':
                lowestStat === pokemon.attack && highestStat !== lowestStat
            })}
          >
            <Label as="dt" className="mr-3">
              Attack
            </Label>
            <dd
              className={classNames(
                'ml-auto',
                'text-indigo-800',
                'text-lg',
                'font-black'
              )}
            >
              {pokemon.attack}
            </dd>
          </div>
          <div
            className={classNames('flex items-center py-2 px-3', {
              'bg-green-vivid-200':
                highestStat === pokemon.defense && highestStat !== lowestStat,
              'bg-red-vivid-100':
                lowestStat === pokemon.defense && highestStat !== lowestStat
            })}
          >
            <Label as="dt" className="mr-3">
              Defense
            </Label>
            <dd
              className={classNames(
                'ml-auto',
                'text-indigo-800',
                'text-lg',
                'font-black'
              )}
            >
              {pokemon.defense}
            </dd>
          </div>
          <div
            className={classNames('flex items-center py-2 px-3', {
              'bg-green-vivid-200':
                highestStat === pokemon.specialAttack &&
                highestStat !== lowestStat,
              'bg-red-vivid-100':
                lowestStat === pokemon.specialAttack &&
                highestStat !== lowestStat
            })}
          >
            <Label as="dt" className="mr-3">
              Sp. Atk
            </Label>
            <dd
              className={classNames(
                'ml-auto',
                'text-indigo-800',
                'text-lg',
                'font-black'
              )}
            >
              {pokemon.specialAttack}
            </dd>
          </div>
          <div
            className={classNames('flex items-center py-2 px-3', {
              'bg-green-vivid-200':
                highestStat === pokemon.specialDefense &&
                highestStat !== lowestStat,
              'bg-red-vivid-100':
                lowestStat === pokemon.specialDefense &&
                highestStat !== lowestStat
            })}
          >
            <Label as="dt" className="mr-3">
              Sp. Def
            </Label>
            <dd
              className={classNames(
                'ml-auto',
                'text-indigo-800',
                'text-lg',
                'font-black'
              )}
            >
              {pokemon.specialDefense}
            </dd>
          </div>
          <div
            className={classNames('flex items-center py-2 px-3', {
              'bg-green-vivid-200':
                highestStat === pokemon.speed && highestStat !== lowestStat,
              'bg-red-vivid-100':
                lowestStat === pokemon.speed && highestStat !== lowestStat
            })}
          >
            <Label as="dt" className="mr-3">
              Speed
            </Label>
            <dd
              className={classNames(
                'ml-auto',
                'text-indigo-800',
                'text-lg',
                'font-black'
              )}
            >
              {pokemon.speed}
            </dd>
          </div>
        </dl>

        {(teamMember?.moves?.edges?.length ?? 0) > 0 && (
          <MoveList className="mt-5 w-full" teamMember={teamMember} />
        )}

        {renderCardActions ? (
          <div className={classNames('mt-5')}>{renderCardActions()}</div>
        ) : null}
      </CardContent>
    </CardWrapper>
  );
};
