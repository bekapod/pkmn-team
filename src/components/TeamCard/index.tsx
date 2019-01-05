import dateFormat from "dateformat";
import { length, prop } from "ramda";
import React from "react";
import * as variables from "../../helpers/variables";
import { IPokemon, ITeam } from "../../types";
import { CardContent, CardHeader, CardWrapper } from "../Card";
import CardHeading from "../CardHeading";
import CardMeta from "../CardMeta";
import PokemonLine from "../PokemonLine";

const getAllTypes = (pokemon: IPokemon[]) =>
  pokemon.flatMap(pkmn => pkmn.types);

interface IProps {
  team: ITeam;
}

const TeamCard = ({ team: { id, name, members, createdAt } }: IProps) => {
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
