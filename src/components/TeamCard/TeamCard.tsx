// import dateFormat from 'dateformat';
import compose from 'lodash/fp/compose';
import flatMap from 'lodash/fp/flatMap';
import get from 'lodash/fp/get';
import isNil from 'lodash/fp/isNil';
import map from 'lodash/fp/map';
import reject from 'lodash/fp/reject';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import {
  PokemonFragmentFragment,
  Team,
  TeamMemberFragmentFragment
} from '~/generated/graphql';
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

export type TeamCardProps = Pick<Team, 'id' | 'name'> & {
  members: TeamMemberFragmentFragment[];
};

export const TeamCard: FunctionComponent<TeamCardProps> = ({
  id,
  name,
  members
}) => {
  const pokemon: PokemonFragmentFragment[] = compose([
    reject(isNil),
    map(get('pokemon'))
  ])(members);

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
                { label: 'Pkmn', value: members.length }
                // { label: 'Created', value: dateFormat(created_at, 'd/m/yy') }
              ]}
            />

            {members.map(
              ({ id: memberId, pokemon: memberPkmn }): JSX.Element => (
                <PokemonLine
                  key={`Team Member: ${memberId}`}
                  pokemon={memberPkmn}
                  outdent="var(--spacing-3)"
                />
              )
            )}
          </CardContent>
        </CardWrapper>
      </CardLink>
    </Link>
  );
};
