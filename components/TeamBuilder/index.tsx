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
import React, {
  FocusEvent,
  KeyboardEvent,
  useEffect,
  useState,
  useCallback
} from "react";
import { ValidationError } from "yup";
import { Pokemon, Team, TeamMember, TeamInput, Error } from "../../types";
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
  try {
    const schema = teamAlreadyExists ? updateTeamSchema : createTeamSchema;
    const validTeam = await schema.validate(team);
    return { team: validTeam };
  } catch (error) {
    return { error };
  }
};

const upsertTeam = (
  newTeam: TeamInput,
  currentTeam: Props["team"],
  currentSearchPokemon: Props["currentSearchPokemon"],
  createTeamMutation: Props["createTeamMutation"],
  updateTeamMutation: Props["updateTeamMutation"]
): void => {
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
};

const deleteTeam = (
  team: Props["team"],
  deleteTeamMutation: Props["deleteTeamMutation"]
): void => {
  if (team) {
    deleteTeamMutation({
      variables: {
        team: {
          id: team.id
        }
      }
    });
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
    ValidationError | undefined
  >(undefined);
  const [teamInput, setTeamInput] = useState<TeamInput | undefined>(undefined);

  const errors = [
    ...[getOr(null, "message", error)],
    ...getOr([], ["error", "details"], team).map(
      ({ errors: errorMessages }: Error["details"]) => errorMessages
    ),
    ...getOr([], "errors", validationErrors)
  ].filter(message => !isNil(message));

  if (createdTeamId) {
    const url = `/team/edit/${createdTeamId}`;
    Router.replace(url, url, { shallow: true });
  }

  if (deletedTeamId) {
    Router.push("/");
  }

  useEffect(() => {
    if (isNil(validationErrors) && !isNil(teamInput)) {
      upsertTeam(
        teamInput,
        team,
        currentSearchPokemon,
        createTeamMutation,
        updateTeamMutation
      );
      setValidationErrors(undefined);
      setTeamInput(undefined);
    }
  }, [
    teamInput,
    validationErrors,
    team,
    currentSearchPokemon,
    createTeamMutation,
    updateTeamMutation
  ]);

  const prepareUpsertTeam = useCallback(
    async (newTeam: TeamInput): Promise<void> => {
      const validationResponse = await validateTeam(newTeam, !isEmpty(team));
      const { team: validTeam, error: transformError } = validationResponse;

      if (!isNil(transformError)) {
        setValidationErrors(transformError);
        setTeamInput(undefined);
      } else {
        setValidationErrors(undefined);
        setTeamInput(validTeam);
      }
    },
    [team]
  );

  const handleTeamNameChange = useCallback(
    (
      e: FocusEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>
    ): void => {
      const { value } = e.target as HTMLInputElement;
      prepareUpsertTeam(merge(transformTeamToInput(team), { name: value }));
    },
    [prepareUpsertTeam, team]
  );

  const handleAddPokemonToTeam = useCallback(
    (pokemon: Pokemon, order: number): void => {
      const transformedTeam = transformTeamToInput(team);

      prepareUpsertTeam(
        merge(transformedTeam, {
          members: concat(getOr([], "members", transformedTeam), [
            { order, pokemonId: pokemon.id }
          ])
        })
      );
    },
    [prepareUpsertTeam, team]
  );

  const handleRemovePokemonFromTeam = useCallback(
    (memberId: string): void => {
      const transformedTeam = transformTeamToInput(team);

      prepareUpsertTeam({
        ...transformedTeam,
        members: transformedTeam.members.filter(({ id }) => id !== memberId)
      });
    },
    [prepareUpsertTeam, team]
  );

  const handleReorderTeamMembers = useCallback(
    (members: TeamMember[]): void => {
      prepareUpsertTeam(
        merge(transformTeamToInput(team), {
          members: transformMembersToInput(members)
        })
      );
    },
    [prepareUpsertTeam, team]
  );

  const handleSaveTeam = useCallback((): void => {
    prepareUpsertTeam(transformTeamToInput(team));
  }, [prepareUpsertTeam, team]);

  const handleDeleteTeam = useCallback((): void => {
    deleteTeam(team, deleteTeamMutation);
  }, [team, deleteTeamMutation]);

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

        {errors.map(message => (
          <ErrorMessage key={message} color={variables.colors.white}>
            {message}
          </ErrorMessage>
        ))}

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

export default React.memo(TeamBuilder, (prevProps: Props, nextProps: Props) => {
  return isEqual(prevProps, nextProps);
});
