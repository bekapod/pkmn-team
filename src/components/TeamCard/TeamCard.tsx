import dateFormat from 'dateformat';
import compose from 'lodash/fp/compose';
import flatMap from 'lodash/fp/flatMap';
import get from 'lodash/fp/get';
import isNil from 'lodash/fp/isNil';
import map from 'lodash/fp/map';
import reject from 'lodash/fp/reject';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import { PokemonFragment, TeamFragment } from '~/generated/graphql';
import { extractNodesFromEdges } from '~/lib/relay';
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

export type TeamCardProps = TeamFragment;

export const TeamCard: FunctionComponent<TeamCardProps> = ({
  id,
  name,
  createdAt,
  members
}) => {
  const pokemon: PokemonFragment[] = compose([
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
                { label: 'Pkmn', value: members.edges?.length ?? 0 },
                { label: 'Created', value: dateFormat(createdAt, 'd/m/yy') }
              ]}
            />

            {extractNodesFromEdges(members.edges).map(member => (
              <PokemonLine
                key={`Team Member: ${member.id} ${member.pokemon.id}`}
                pokemon={member.pokemon}
                outdent="var(--spacing-3)"
              />
            ))}
          </CardContent>
        </CardWrapper>
      </CardLink>
    </Link>
  );
};
