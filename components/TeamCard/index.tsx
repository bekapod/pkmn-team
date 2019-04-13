import dateFormat from "dateformat";
import { compose, flatMap, get, isNil, map, reject } from "lodash/fp";
import Link from "next/link";
import React from "react";
import * as variables from "../../helpers/variables";
import { Pokemon, Team } from "../../types";
import { CardContent, CardHeader, CardLink, CardWrapper } from "../Card";
import CardHeading from "../CardHeading";
import CardMeta from "../CardMeta";
import PokemonLine from "../PokemonLine";

const getAllTypes = flatMap(get("types"));

interface Props {
  team: Team;
}

const TeamCard = ({
  team: { id, name, members, createdAt }
}: Props): JSX.Element => {
  const pokemon: Pokemon[] = compose([reject(isNil), map(get("pokemon"))])(
    members
  );

  return (
    <Link href={`/team/edit/${id}/`} passHref>
      <CardLink data-testid={`team-link-${id}`}>
        <CardWrapper>
          <CardHeader types={getAllTypes(pokemon)}>
            <CardHeading>{name}</CardHeading>
          </CardHeader>

          <CardContent>
            <CardMeta
              id={id}
              items={[
                { label: "Pkmn", value: members.length },
                { label: "Created", value: dateFormat(createdAt, "d/m/yy") }
              ]}
            />

            {members.map(
              ({ id: memberId, pokemon: memberPkmn }): JSX.Element => (
                <PokemonLine
                  key={`Team Member: ${memberId}`}
                  pokemon={memberPkmn}
                  outdent={variables.spacing.sm}
                />
              )
            )}
          </CardContent>
        </CardWrapper>
      </CardLink>
    </Link>
  );
};

export default TeamCard;
