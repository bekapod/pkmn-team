import dateFormat from 'dateformat';
import { compose, flatMap, get, isNil, map, reject } from 'lodash/fp';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import { Pokemon, Teams, Team_Member } from '~/generated/graphql';
import {
  CardContent,
  CardHeader,
  CardHeading,
  CardLink,
  CardWrapper
} from '../Card';
import { CardMeta } from '../CardMeta';
import { PokemonLine } from '../PokemonLine';

const getAllTypes = compose(flatMap(get('type')), flatMap(get('types')));

type TeamMember = Pick<Team_Member, 'id' | 'order'> & {
  pokemon: Pick<
    Pokemon,
    'id' | 'pokedex_id' | 'name' | 'slug' | 'sprite' | 'types'
  >;
};
export type TeamCardProps = Pick<Teams, 'id' | 'name' | 'created_at'> & {
  team_members: TeamMember[];
};

export const TeamCard: FunctionComponent<TeamCardProps> = ({
  id,
  name,
  team_members,
  created_at
}) => {
  const pokemon: Pokemon[] = compose([reject(isNil), map(get('pokemon'))])(
    team_members
  );

  return (
    <Link href={`/team/${id}/`} passHref>
      <CardLink data-testid={`team-link-${id}`}>
        <CardWrapper>
          <CardHeader types={getAllTypes(pokemon)}>
            <CardHeading>{name}</CardHeading>
          </CardHeader>

          <CardContent>
            <CardMeta
              id={id}
              items={[
                { label: 'Pkmn', value: team_members.length },
                { label: 'Created', value: dateFormat(created_at, 'd/m/yy') }
              ]}
            />

            {team_members.map(
              ({ id: memberId, pokemon: memberPkmn }): JSX.Element => (
                <PokemonLine
                  key={`Team Member: ${memberId}`}
                  pokemon={memberPkmn}
                  outdent="var(--spacing-sm)"
                />
              )
            )}
          </CardContent>
        </CardWrapper>
      </CardLink>
    </Link>
  );
};
