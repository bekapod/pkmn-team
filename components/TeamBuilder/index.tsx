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
  isEmpty,
  isEqual
} from "lodash/fp";
import Router from "next/router";
import React, { FocusEvent, KeyboardEvent, useState, useCallback } from "react";
import { ValidationError } from "yup";
import {
  Pokemon,
  Team,
  TeamMember,
  TeamInput,
  Error,
  TeamMemberInput
} from "../../types";
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
  ({ id, order, pokemon: { id: pokemonId } }): TeamMemberInput => ({
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

const generateOptimisticResponse = (
  newTeam: TeamInput,
  currentTeam: Team,
  currentSearchPokemon: Pokemon | {} = {}
): { __typename: "Mutation"; updateTeam: Team } => ({
  __typename: "Mutation",
  updateTeam: {
    id: newTeam.id || "",
    name: newTeam.name,
    createdAt: getOr("", "createdAt", currentTeam),
    __typename: "Team",
    members: newTeam.members.map(
      (member): TeamMember => ({
        order: member.order,
        id: member.id || getUniqueId(),
        pokemon: pipe(
          find(({ id }): boolean => member.id === id),
          get("pokemon")
        )(getOr([], "members", currentTeam)) || {
          ...currentSearchPokemon,
          moves: []
        },
        __typename: "TeamMember"
      })
    )
  }
});

const validateTeam = async (
  team: TeamInput,
  teamAlreadyExists: boolean = true
): Promise<{ team?: TeamInput; error?: ValidationError }> => {
  try {
    const schema = teamAlreadyExists ? updateTeamSchema : createTeamSchema;
    const validTeam = await schema.validate(team);
    return { team: validTeam };
  } catch (error) {
    return { error };
  }
};

const TeamBuilder = ({
  team,
  currentSearchPokemon,
  createdTeamId,
  deletedTeamId,
  loading,
  error,
  createTeamMutation,
  updateTeamMutation,
  deleteTeamMutation
}: Props): JSX.Element => {
  const [validationErrors, setValidationErrors] = useState<
    ValidationError | { message: string } | undefined
  >(undefined);
  const errors = [
    ...[getOr(null, "message", error)],
    ...getOr([], ["error", "details"], team).map(
      ({ errors: errorMessages }: Error["details"]): string[] => errorMessages
    ),
    ...getOr([], "errors", validationErrors)
  ].filter((message): boolean => !isNil(message));

  if (createdTeamId) {
    const url = `/team/edit/${createdTeamId}`;
    Router.replace(url, url, { shallow: true });
  }

  if (deletedTeamId) {
    Router.push("/");
  }

  const upsertTeam = useCallback(
    async (newTeam: TeamInput): Promise<void> => {
      const validationResponse = await validateTeam(newTeam, !isEmpty(team));
      const { team: validTeam, error: transformError } = validationResponse;

      if (!isNil(transformError)) {
        setValidationErrors(transformError);
      } else if (!validTeam) {
        setValidationErrors({ message: "Unexpected error happened." });
      } else {
        setValidationErrors(undefined);

        const mutationVariables = { team: newTeam };

        if (validTeam.id && team) {
          const optimisticResponse = generateOptimisticResponse(
            newTeam,
            team,
            currentSearchPokemon
          );

          updateTeamMutation({
            variables: mutationVariables,
            optimisticResponse
          });
        } else {
          createTeamMutation({ variables: mutationVariables });
        }
      }
    },
    [team, currentSearchPokemon, updateTeamMutation, createTeamMutation]
  );

  const deleteTeam = useCallback((): void => {
    if (team) {
      deleteTeamMutation({
        variables: {
          team: {
            id: team.id
          }
        }
      });
    }
  }, [team, deleteTeamMutation]);

  const handleTeamNameChange = useCallback(
    (
      e: FocusEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>
    ): void => {
      const { value } = e.target as HTMLInputElement;
      upsertTeam(merge(transformTeamToInput(team), { name: value }));
    },
    [upsertTeam, team]
  );

  const handleAddPokemonToTeam = useCallback(
    (pokemon: Pokemon, order: number): void => {
      const transformedTeam = transformTeamToInput(team);

      upsertTeam(
        merge(transformedTeam, {
          members: concat(getOr([], "members", transformedTeam), [
            { order, pokemonId: pokemon.id }
          ])
        })
      );
    },
    [upsertTeam, team]
  );

  const handleRemovePokemonFromTeam = useCallback(
    (memberId: string): void => {
      const transformedTeam = transformTeamToInput(team);

      upsertTeam({
        ...transformedTeam,
        members: transformedTeam.members.filter(
          ({ id }): boolean => id !== memberId
        )
      });
    },
    [upsertTeam, team]
  );

  const handleReorderTeamMembers = useCallback(
    (members: TeamMember[]): void => {
      upsertTeam(
        merge(transformTeamToInput(team), {
          members: transformMembersToInput(members)
        })
      );
    },
    [upsertTeam, team]
  );

  const handleSaveTeam = useCallback((): void => {
    upsertTeam(transformTeamToInput(team));
  }, [upsertTeam, team]);

  const handleDeleteTeam = useCallback((): void => {
    deleteTeam();
  }, [deleteTeam]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === "Enter") {
        handleTeamNameChange(e);
      }
    },
    [handleTeamNameChange]
  );

  return (
    <>
      <StickyBar>
        {!loading ? (
          <>
            <CtaButton key="save" onClick={handleSaveTeam} small>
              Save team
            </CtaButton>
            <CtaButton key="delete" onClick={handleDeleteTeam} small>
              Delete team
            </CtaButton>
          </>
        ) : null}

        {errors.map(
          (message): JSX.Element => (
            <ErrorMessage key={message} color={variables.colors.white}>
              {message}
            </ErrorMessage>
          )
        )}

        {loading ? (
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
};

export default React.memo(
  TeamBuilder,
  (prevProps: Props, nextProps: Props): boolean => {
    return isEqual(prevProps, nextProps);
  }
);
