import dateFormat from "dateformat";
import { compose, flatMap, get, isNil, map, reject } from "lodash/fp";
import React from "react";
import * as variables from "../../helpers/variables";
import { IPokemon, ITeam, Type } from "../../types";
import { CardContent, CardHeader, CardWrapper } from "../Card";
import CardHeading from "../CardHeading";
import CardMeta from "../CardMeta";
import PokemonLine from "../PokemonLine";

const getAllTypes = flatMap(get("types"));

interface IProps {
  team: ITeam;
}

const TeamCard = ({ team: { id, name, members, createdAt } }: IProps) => {
  const pokemon: IPokemon[] = compose([reject(isNil), map(get("pokemon"))])(
    members
  );

  return (
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
