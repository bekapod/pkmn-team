import { FunctionComponent } from 'react';
import classNames from 'classnames';
import { Pokemon, TeamMemberFragmentFragment } from '~/generated/graphql';
import { formatPokemonName, sortBySlug } from '~/lib/general';
import { CardContent, CardHeader, CardWrapper, CardHeading } from '../Card';
import { InlineList } from '../InlineList';
import { TypeTag } from '../TypeTag';
import { MoveList } from '../MoveList';

export type PokemonCardProps = {
  teamMember?: TeamMemberFragmentFragment;
  pokemon: Pokemon;
  renderCardActions?: () => JSX.Element;
};

export const PokemonCard: FunctionComponent<PokemonCardProps> = ({
  teamMember,
  pokemon,
  renderCardActions
}) => {
  const { pokedex_id, types, name, sprite } = pokemon;
  const actualTypes = types.map(({ type }) => type);

  return (
    <CardWrapper data-testid={`pokemon-${pokemon.pokedex_id}`}>
      <CardHeader types={actualTypes}>
        <CardHeading>{formatPokemonName(pokemon)}</CardHeading>
      </CardHeader>

      <CardContent className={classNames('py-6', 'items-center')}>
        <img
          className={classNames('h-14')}
          src={`/sprites/${sprite}`}
          alt={`${name} sprite`}
        />

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

        {(teamMember?.learned_moves?.length ?? 0) > 0 && (
          <MoveList className="mt-6 w-full" teamMember={teamMember} />
        )}

        {renderCardActions ? (
          <div className={classNames('mt-6')}>{renderCardActions()}</div>
        ) : null}
      </CardContent>
    </CardWrapper>
  );
};
