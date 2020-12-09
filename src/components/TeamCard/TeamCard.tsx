import dateFormat from 'dateformat';
import { compose, flatMap, get, isNil, map, reject } from 'lodash/fp';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import { Pokemon, Team } from '~/generated/graphql';
import {
  CardContent,
  CardHeader,
  CardHeading,
  CardLink,
  CardWrapper
} from '../Card';
import { CardMeta } from '../CardMeta';
import { PokemonLine } from '../PokemonLine';

const getAllTypes = flatMap(get('types'));

export type TeamCardProps = Team;

export const TeamCard: FunctionComponent<TeamCardProps> = ({
  _id,
  name,
  members,
  _ts
}) => {
  const pokemon: Pokemon[] = compose([reject(isNil), map(get('pokemon'))])(
    members
  );

  return (
    <Link href={`/team/edit/${_id}/`} passHref>
      <CardLink data-testid={`team-link-${_id}`}>
        <CardWrapper>
          <CardHeader types={getAllTypes(pokemon)}>
            <CardHeading>{name}</CardHeading>
          </CardHeader>

          <CardContent>
            <CardMeta
              id={_id}
              items={[
                { label: 'Pkmn', value: members.length },
                { label: 'Created', value: dateFormat(_ts, 'd/m/yy') }
              ]}
            />

            {members.map(
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
