// @flow
import React, { Fragment, Component } from "react";
import { Redirect } from "react-router-dom";
import {
  prop,
  propOr,
  anyPass,
  isNil,
  isEmpty,
  length,
  keys,
  gt,
  lt,
  set,
  lensProp,
  or,
  equals,
  not
} from "ramda";
import Heading from "../Heading";
import SectionContainer from "../SectionContainer";
import CenteredRow from "../CenteredRow";
import PokemonSearch from "../PokemonSearch";
import GiantInput from "../GiantInput";
import { CtaButton } from "../Cta";
import PokemonGrid from "../PokemonGrid";
import PokemonCard from "../PokemonCard";
import ErrorMessage from "../ErrorMessage";
import withScrollToTop from "../../hocs/withScrollToTop";
import { getUniqueId } from "../../helpers/general";
import type { Pokemon, TeamMember } from "../../types";

type Props = {
  pokemon: Array<Pokemon>,
  createdTeamId: string,
  createTeamMutation: ({
    variables: {
      name: string,
      pokedexIds: Array<number>
    }
  }) => void,
  setTeamName: (name: string) => void,
  setCurrentSearchPokemon: (pokemon: Pokemon) => void,
  addPokemonToTeam: (member: TeamMember) => void,
  removePokemonFromTeam: (member: TeamMember) => void,
  teamBuilderName: string,
  teamBuilderCurrentSearchPokemon: Pokemon,
  teamBuilderMembers: { [key: string]: TeamMember },
  scrollToTop: () => void
};

type State = {
  isValid: boolean,
  isTouched: boolean,
  errors: { [key: string]: string }
};

class TeamBuilder extends Component<Props, State> {
  static defaultProps = {
    createdTeamId: null,
    teamBuilderCurrentSearchPokemon: undefined,
    teamBuilderPokemon: {}
  };

  constructor(props: Props) {
    super(props);

    this.handleTeamNameChange = this.handleTeamNameChange.bind(this);
    this.handleAddPokemonToTeam = this.handleAddPokemonToTeam.bind(this);
    this.handleCreateTeam = this.handleCreateTeam.bind(this);
    this.validate = this.validate.bind(this);
  }

  state = {
    isTouched: false,
    isValid: false,
    errors: {}
  };

  componentDidMount() {
    this.validate();
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return or(
      not(equals(this.state, nextState)),
      not(equals(this.props, nextProps))
    );
  }

  componentDidUpdate() {
    this.validate();
  }

  handleTeamNameChange: (e: Event) => void;
  handleTeamNameChange(e: Event) {
    if (e.target instanceof HTMLInputElement) {
      this.props.setTeamName(e.target.value);

      this.setState(() => ({
        isTouched: true
      }));
    }
  }

  handleAddPokemonToTeam: () => void;
  handleAddPokemonToTeam() {
    this.props.addPokemonToTeam({
      id: getUniqueId(),
      pokemon: this.props.teamBuilderCurrentSearchPokemon
    });

    this.setState(() => ({
      isTouched: true
    }));
  }

  handleRemovePokemonFromTeam: (memberId: string) => () => void;
  handleRemovePokemonFromTeam(memberId) {
    return () => {
      this.props.removePokemonFromTeam({ id: memberId });
    };
  }

  handleCreateTeam: () => void;
  handleCreateTeam() {
    const {
      createTeamMutation,
      teamBuilderName,
      teamBuilderMembers
    } = this.props;

    this.validate({ setTouched: true });

    if (this.state.isValid) {
      createTeamMutation({
        variables: {
          name: teamBuilderName,
          pokedexIds: keys(teamBuilderMembers).map(key => {
            const { pokemon } = teamBuilderMembers[key];
            return prop("pokedexId", pokemon);
          })
        }
      });
    } else {
      this.props.scrollToTop();
    }
  }

  validate: (options?: { setTouched?: boolean }) => void;
  validate(options?: { setTouched?: boolean } = {}) {
    const { teamBuilderName, teamBuilderMembers } = this.props;
    const nameError = lensProp("name");
    const membersError = lensProp("members");
    const isInvalid = anyPass([isEmpty, isNil]);

    if (options.setTouched) {
      this.setState(() => ({
        isTouched: true
      }));
    }

    if (or(isInvalid(teamBuilderName), isInvalid(teamBuilderMembers))) {
      this.setState(() => ({
        isValid: false
      }));
    } else {
      this.setState(() => ({
        isValid: true
      }));
    }

    if (isInvalid(teamBuilderName)) {
      this.setState(state => ({
        errors: set(nameError, "Team name is required", state.errors)
      }));
    } else {
      this.setState(state => ({
        errors: set(nameError, undefined, state.errors)
      }));
    }

    if (isInvalid(teamBuilderMembers)) {
      this.setState(state => ({
        errors: set(
          membersError,
          "Your team must have some pokemon",
          state.errors
        )
      }));
    } else {
      this.setState(state => ({
        errors: set(membersError, undefined, state.errors)
      }));
    }
  }

  render() {
    const {
      pokemon,
      setCurrentSearchPokemon,
      teamBuilderCurrentSearchPokemon,
      teamBuilderMembers,
      teamBuilderName,
      createdTeamId
    } = this.props;
    const currentSearchPokemonName =
      teamBuilderCurrentSearchPokemon &&
      prop("name", teamBuilderCurrentSearchPokemon);
    const numberOfMembersInTeam = length(keys(teamBuilderMembers));
    const nameErrorMessage = propOr(undefined, "name", this.state.errors);
    const nameHasError = this.state.isTouched && nameErrorMessage;

    if (createdTeamId) {
      return <Redirect to={`/team/edit/${createdTeamId}`} />;
    }

    return (
      <Fragment>
        <Heading>Create a Team</Heading>
        <SectionContainer>
          <CenteredRow stackVertically>
            <GiantInput
              aria-label="Choose a team name"
              placeholder="Choose a team name"
              onChange={this.handleTeamNameChange}
              defaultValue={teamBuilderName}
              isInvalid={nameHasError}
            />
            {this.state.isTouched && nameHasError && nameErrorMessage && (
              <ErrorMessage>{nameErrorMessage}</ErrorMessage>
            )}
          </CenteredRow>
          {lt(numberOfMembersInTeam, 6) && [
            <CenteredRow key="Search form">
              <PokemonSearch
                pokemon={pokemon}
                currentSearchPokemon={teamBuilderCurrentSearchPokemon}
                setCurrentSearchPokemon={setCurrentSearchPokemon}
              />
            </CenteredRow>,
            currentSearchPokemonName && (
              <CenteredRow key="Add member button">
                <CtaButton secondary onClick={this.handleAddPokemonToTeam}>
                  {`Add ${currentSearchPokemonName} to your team`}
                </CtaButton>
              </CenteredRow>
            )
          ]}

          {gt(numberOfMembersInTeam, 0) && [
            <CenteredRow key="Team members">
              <PokemonGrid>
                {keys(teamBuilderMembers).map(id => {
                  const { pokemon: pkmn } = teamBuilderMembers[id];
                  return (
                    <PokemonCard
                      key={id}
                      memberId={id}
                      pokemon={pkmn}
                      renderCardActions={() => (
                        <CtaButton
                          secondary
                          small
                          onClick={this.handleRemovePokemonFromTeam(id)}
                        >
                          {`Remove ${pkmn.name} from team`}
                        </CtaButton>
                      )}
                    />
                  );
                })}
              </PokemonGrid>
            </CenteredRow>,
            <CenteredRow key="Create button">
              <CtaButton onClick={this.handleCreateTeam}>
                Create this team!
              </CtaButton>
            </CenteredRow>
          ]}
        </SectionContainer>
      </Fragment>
    );
  }
}

export default withScrollToTop(TeamBuilder);
