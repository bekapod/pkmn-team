import { ApolloError } from "apollo-client";
import {
  map,
  merge,
  getOr,
  concat,
  get,
  find,
  pipe,
  isNil,
  isEmpty
} from "lodash/fp";
import Router from "next/router";
import React, { FocusEvent, KeyboardEvent, useEffect, useState } from "react";
import { ValidationError } from "yup";
import { Pokemon, Team, TeamMember, TeamInput } from "../../types";
import CenteredRow from "../CenteredRow";
import { CtaButton } from "../Cta";
import ErrorMessage from "../ErrorMessage";
import GiantInput from "../GiantInput";
import LoadingIcon from "../LoadingIcon";
import TeamView from "../TeamView";
import { getUniqueId } from "../../helpers/general";
import StickyBar from "../StickyBar";
import * as variables from "../../helpers/variables";
import { updateTeamSchema, createTeamSchema } from "../../helpers/validation";

interface Props {
  team?: Team;
  currentSearchPokemon?: Pokemon;
  createdTeamId?: string;
  deletedTeamId?: string;
  loading?: boolean;
  error?: ApolloError;
  createTeamMutation: (mutation: { variables: { team: TeamInput } }) => void;
  updateTeamMutation: (mutation: {
    variables: { team: TeamInput };
    optimisticResponse: { __typename: "Mutation"; updateTeam: Team };
  }) => void;
  deleteTeamMutation: (mutation: {
    variables: {
      team: {
        id: string;
      };
    };
  }) => void;
}

const transformMembersToInput = map(
  ({ id, order, pokemon: { id: pokemonId } }) => ({
    id,
    order,
    pokemonId
  })
);

const transformTeamToInput = (
  { id, name = "", members = [] }: Team = {
    id: "",
    name: "",
    createdAt: "",
    members: []
  }
): TeamInput => ({
  id,
  name,
  members: transformMembersToInput(members)
});

const validateTeam = async (
  team: TeamInput,
  teamAlreadyExists: boolean = true
): Promise<{ team?: TeamInput; error?: ValidationError }> => {
  console.log("team", team);
  try {
    console.log(teamAlreadyExists);
    const schema = teamAlreadyExists ? updateTeamSchema : createTeamSchema;
    const validTeam = await schema.validate(team);
    return { team: validTeam };
  } catch (error) {
    return { error };
  }
};

const useUpsertTeam = (
  newTeam: TeamInput,
  currentTeam: Props["team"],
  currentSearchPokemon: Props["currentSearchPokemon"],
  createTeamMutation: Props["createTeamMutation"],
  updateTeamMutation: Props["updateTeamMutation"]
): void => {
  useEffect(() => {
    const mutationVariables = { team: newTeam };

    if (newTeam.id) {
      updateTeamMutation({
        variables: mutationVariables,
        optimisticResponse: {
          __typename: "Mutation",
          updateTeam: {
            id: newTeam.id,
            name: newTeam.name,
            createdAt: getOr("", "createdAt", currentTeam),
            __typename: "Team",
            members: newTeam.members.map(member => ({
              order: member.order,
              id: member.id || getUniqueId(),
              pokemon: pipe(
                find(({ id }) => member.id === id),
                get("pokemon")
              )(getOr([], "members", currentTeam)) || {
                ...currentSearchPokemon,
                moves: []
              },
              __typename: "TeamMember"
            }))
          }
        }
      });
    } else {
      createTeamMutation({ variables: mutationVariables });
    }
  });
};

const useDeleteTeam = (
  team: Props["team"],
  deleteTeamMutation: Props["deleteTeamMutation"]
): void => {
  useEffect(() => {
    if (team) {
      deleteTeamMutation({
        variables: {
          team: {
            id: team.id
          }
        }
      });
    }
  });
};

const TeamBuilder = React.memo(
  ({
    team,
    currentSearchPokemon,
    createdTeamId,
    deletedTeamId,
    loading,
    error
  }: Props): JSX.Element => {
    const [validationErrors, setValidationErrors] = useState<
      ValidationError | undefined
    >(undefined);
    const [teamInput, setTeamInput] = useState<TeamInput | undefined>(
      undefined
    );

    if (createdTeamId) {
      const url = `/team/edit/${createdTeamId}`;
      Router.replace(url, url, { shallow: true });
    }

    if (deletedTeamId) {
      Router.push("/");
    }

    useEffect(() => {
      console.log("team input", teamInput);
      console.log("validation errors", validationErrors);
    });

    const prepareUpsertTeam = async (newTeam: TeamInput): Promise<void> => {
      console.log("new team", newTeam, team);
      const validationResponse = await validateTeam(newTeam, !isEmpty(team));
      const { team: validTeam, error: transformError } = validationResponse;

      if (!isNil(transformError)) {
        setValidationErrors(transformError);
        setTeamInput(undefined);
      } else {
        setValidationErrors(undefined);
        setTeamInput(validTeam);
      }
    };

    const handleTeamNameChange = (
      e: FocusEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>
    ): void => {
      const { value } = e.target as HTMLInputElement;
      console.log("transformed", transformTeamToInput(team));
      prepareUpsertTeam(merge(transformTeamToInput(team), { name: value }));
    };

    const handleAddPokemonToTeam = (pokemon: Pokemon, order: number): void => {
      const transformedTeam = transformTeamToInput(team);

      prepareUpsertTeam(
        merge(transformedTeam, {
          members: concat(getOr([], "members", transformedTeam), [
            { order, pokemonId: pokemon.id }
          ])
        })
      );
    };

    const handleRemovePokemonFromTeam = (memberId: string): void => {
      const transformedTeam = transformTeamToInput(team);

      prepareUpsertTeam({
        ...transformedTeam,
        members: transformedTeam.members.filter(({ id }) => id !== memberId)
      });
    };

    const handleReorderTeamMembers = (members: TeamMember[]): void => {
      prepareUpsertTeam(
        merge(transformTeamToInput(team), {
          members: transformMembersToInput(members)
        })
      );
    };

    const handleSaveTeam = (): void => {
      prepareUpsertTeam(transformTeamToInput(team));
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === "Enter") {
        handleTeamNameChange(e);
      }
    };

    return (
      <>
        <StickyBar>
          {!error && !loading ? (
            <>
              <CtaButton onClick={handleSaveTeam} small>
                Save team
              </CtaButton>
            </>
          ) : null}

          {!!error && (
            <ErrorMessage key="Error message" color={variables.colors.white}>
              {error.message}
            </ErrorMessage>
          )}

          {getOr([], ["error", "details"], team).map(({ field, errors }) => (
            <ErrorMessage key={field} color={variables.colors.white}>
              {errors.map(message => message)}
            </ErrorMessage>
          ))}

          {/* {getOr([], "errors", validationErrors).map(({ field, errors }) => (
          <ErrorMessage key={field} color={variables.colors.white}>
            {errors.map(message => message)}
          </ErrorMessage>
        ))} */}

          {loading && !error ? (
            <LoadingIcon
              key="Loading icon"
              spinner
              small
              color={variables.colors.white}
            />
          ) : null}
        </StickyBar>

        <CenteredRow stackVertically>
          <GiantInput
            aria-label="Choose a team name"
            placeholder="Choose a team name"
            defaultValue={getOr("", "name", team)}
            onBlur={handleTeamNameChange}
            onKeyPress={handleKeyPress}
          />
        </CenteredRow>

        <TeamView
          teamMembers={getOr([], "members", team)}
          currentSearchPokemon={currentSearchPokemon}
          addPokemonToTeam={handleAddPokemonToTeam}
          removePokemonFromTeam={handleRemovePokemonFromTeam}
          reorderTeamMembers={handleReorderTeamMembers}
        />
      </>
    );
  }
);

export default TeamBuilder;
