// @flow
import React from "react";
import { compose, map, flatten, prop, propOr, length } from "ramda";
import dateFormat from "dateformat";
import { CardWrapper, CardHeader, CardContent } from "../Card";
import CardHeading from "../CardHeading";
import CardMeta from "../CardMeta";
import PokemonLine from "../PokemonLine";
import * as variables from "../../helpers/variables";
import type { Team } from "../../types";

const getAllTypes = compose(
  flatten,
  map(propOr([], "types"))
);

type Props = {
  team: Team
};

const TeamCard = ({ team: { id, name, members, createdAt } }: Props) => {
  const pokemon = members.map(member => prop("pokemon", member));

  return (
    <CardWrapper>
      <CardHeader types={getAllTypes(pokemon)}>
        <CardHeading>{name}</CardHeading>
      </CardHeader>

      <CardContent>
        <CardMeta
          id={id}
          items={[
            { label: "Pkmn", value: length(members) },
            { label: "Created", value: dateFormat(createdAt, "d/m/yy") }
          ]}
        />

        {members.map(({ id: memberId, pokemon: memberPkmn }) => (
          <PokemonLine
            key={`Team Member: ${memberId}`}
            pokemon={memberPkmn}
            outdent={variables.spacing.sm}
          />
        ))}
      </CardContent>
    </CardWrapper>
  );
};

export default TeamCard;
