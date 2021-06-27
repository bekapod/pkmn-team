import dateFormat from 'dateformat';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import {
  PokemonFragment,
  PokemonTypeFragment,
  TeamFragment
} from '~/generated/graphql';
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

const getAllTypes = (pokemon?: PokemonFragment[]) =>
  pokemon
    ?.flatMap(p => p.types.edges?.flatMap(t => t?.node))
    .filter((t): t is PokemonTypeFragment => !!t);

export type TeamCardProps = TeamFragment;

export const TeamCard: FunctionComponent<TeamCardProps> = ({
  id,
  name,
  createdAt,
  members
}) => {
  const pokemon = members.edges
    ?.map(member => member?.node?.pokemon)
    .filter((p): p is PokemonFragment => !!p);

  return (
    <Link href={`/team/${id}/`} passHref>
      <CardLink data-testid={`team-link-${id}`}>
        <CardWrapper>
          <CardHeader types={getAllTypes(pokemon)}>
            <CardHeading>{name}</CardHeading>
          </CardHeader>

          <CardContent>
            <CardMeta
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
