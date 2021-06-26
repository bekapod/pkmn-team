import { FunctionComponent, useEffect, useRef } from 'react';
import { connectInfiniteHits } from 'react-instantsearch-dom';
import type { InfiniteHitsProvided, Hit } from 'react-instantsearch-core';
import type { PokemonFragment } from '~/generated/graphql';
import { PokemonLine, PokemonLineProps } from '../PokemonLine';

export const InfinitePokemon: FunctionComponent<
  InfiniteHitsProvided<Hit<PokemonFragment>> & {
    onClick: (pokemon: PokemonLineProps['pokemon']) => void;
  }
> = ({ hits, hasMore, refineNext, onClick }) => {
  const sentinel = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const currentSentinel = sentinel.current;

    if (currentSentinel) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && hasMore) {
            refineNext();
          }
        });
      });

      observer.observe(currentSentinel);

      return () => observer.unobserve(currentSentinel);
    }
  }, [hasMore, refineNext]);

  return (
    <ul className="max-h-5-10 overflow-y-auto pt-1">
      {hits.map(({ objectID, ...rest }) => {
        const pokemon: PokemonLineProps['pokemon'] = {
          pokedexId: rest.pokedexId,
          slug: rest.slug,
          sprite: rest.sprite,
          id: rest.id,
          name: rest.name,
          types: rest.types,
          abilities: rest.abilities,
          attack: rest.attack,
          defense: rest.defense,
          description: rest.description,
          hp: rest.hp,
          isBaby: rest.isBaby,
          isLegendary: rest.isLegendary,
          isMythical: rest.isMythical,
          specialAttack: rest.specialAttack,
          specialDefense: rest.specialDefense,
          speed: rest.speed,
          color: rest.color,
          shape: rest.shape,
          habitat: rest.habitat,
          height: rest.height,
          weight: rest.weight,
          isDefaultVariant: rest.isDefaultVariant,
          eggGroups: { edges: [] },
          evolvesTo: { edges: [] },
          evolvesFrom: { edges: [] },
          moves: { edges: [] }
        };
        return (
          <li key={objectID} className="ais-InfiniteHits-item">
            <PokemonLine
              data-testid={`autocomplete-result-${pokemon.pokedexId}`}
              pokemon={pokemon}
              onClick={() => onClick(pokemon)}
            />
          </li>
        );
      })}
      <li ref={sentinel} />
    </ul>
  );
};

export const ConnectedInfinitePokemon = connectInfiniteHits(InfinitePokemon);
