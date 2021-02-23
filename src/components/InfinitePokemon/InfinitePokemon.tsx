import { FunctionComponent, useEffect, useRef } from 'react';
import { connectInfiniteHits } from 'react-instantsearch-dom';
import type { InfiniteHitsProvided, Hit } from 'react-instantsearch-core';
import type { PokemonFragmentFragment } from '~/generated/graphql';
import { PokemonLine } from '../PokemonLine';

export const InfinitePokemon: FunctionComponent<
  InfiniteHitsProvided<Hit<PokemonFragmentFragment>> & {
    onClick: (pokemon: PokemonFragmentFragment) => void;
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
        const pokemon: PokemonFragmentFragment = {
          pokedex_id: rest.pokedex_id,
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
          is_baby: rest.is_baby,
          is_legendary: rest.is_legendary,
          is_mythical: rest.is_mythical,
          special_attack: rest.special_attack,
          special_defense: rest.special_defense,
          speed: rest.speed
        };
        return (
          <li key={objectID} className="ais-InfiniteHits-item">
            <PokemonLine
              data-testid={`autocomplete-result-${pokemon.pokedex_id}`}
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
