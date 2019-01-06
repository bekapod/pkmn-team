import {
  anyPass,
  equals,
  gt,
  isEmpty,
  isNil,
  keys,
  lt,
  prop,
  propOr,
  unset
} from "lodash/fp";
import React, { ChangeEvent, Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { getUniqueId } from "../../helpers/general";
import withScrollToTop from "../../hocs/withScrollToTop";
import { IPokemon, ITeamMember } from "../../types";
import CenteredRow from "../CenteredRow";
import { CtaButton } from "../Cta";
import ErrorMessage from "../ErrorMessage";
import GiantInput from "../GiantInput";
import Heading from "../Heading";
import PokemonCard from "../PokemonCard";
import PokemonGrid from "../PokemonGrid";
import PokemonSearch from "../PokemonSearch";
import SectionContainer from "../SectionContainer";

interface IProps {
  pokemon: IPokemon[];
  createdTeamId?: string;
  createTeamMutation: (
    mutation: {
      variables: {
        name: string;
        pokedexIds: number[];
      };
    }
  ) => void;
  setTeamName: (name: string) => void;
  setCurrentSearchPokemon: (pokemon: IPokemon) => void;
  addPokemonToTeam: (member: ITeamMember) => void;
  removePokemonFromTeam: (member: { id: string }) => void;
  teamBuilderName?: string;
  teamBuilderCurrentSearchPokemon?: IPokemon;
  teamBuilderMembers?: { [key: string]: ITeamMember };
  scrollToTop?: () => void;
}

interface IState {
  isValid: boolean;
  isTouched: boolean;
  errors: { [key: string]: string };
}

class TeamBuilder extends Component<IProps, IState> {
  public state = {
    errors: {},
    isTouched: false,
    isValid: false
  };

  constructor(props: IProps) {
    super(props);

    this.handleTeamNameChange = this.handleTeamNameChange.bind(this);
    this.handleAddPokemonToTeam = this.handleAddPokemonToTeam.bind(this);
    this.handleCreateTeam = this.handleCreateTeam.bind(this);
    this.validate = this.validate.bind(this);
  }

  public componentDidMount() {
    this.validate();
  }

  public shouldComponentUpdate(nextProps: IProps, nextState: IState) {
    return !equals(this.state, nextState) || !equals(this.props, nextProps);
  }

  public componentDidUpdate() {
    this.validate();
  }

  public handleTeamNameChange(e: ChangeEvent<HTMLInputElement>) {
    this.props.setTeamName(e.target.value);

    this.setState(() => ({
      isTouched: true
    }));
  }

  public handleAddPokemonToTeam() {
    if (this.props.teamBuilderCurrentSearchPokemon) {
      this.props.addPokemonToTeam({
        id: getUniqueId(),
        pokemon: this.props.teamBuilderCurrentSearchPokemon
      });

      this.setState(() => ({
        isTouched: true
      }));
    }
  }

  public handleRemovePokemonFromTeam(memberId: string) {
    return () => {
      this.props.removePokemonFromTeam({ id: memberId });
    };
  }

  public handleCreateTeam() {
    const {
      createTeamMutation,
      teamBuilderName,
      teamBuilderMembers
    } = this.props;

    this.validate({ setTouched: true });

    if (this.state.isValid && teamBuilderName && teamBuilderMembers) {
      createTeamMutation({
        variables: {
          name: teamBuilderName,
          pokedexIds: keys(teamBuilderMembers).map(key => {
            const { pokemon } = teamBuilderMembers[key];
            return prop("pokedexId", pokemon);
          })
        }
      });
    } else if (this.props.scrollToTop) {
      this.props.scrollToTop();
    }
  }

  public validate(options: { setTouched?: boolean } = {}) {
    const { teamBuilderName, teamBuilderMembers } = this.props;
    const isInvalid = anyPass([isEmpty, isNil]);

    if (options.setTouched) {
      this.setState(() => ({
        isTouched: true
      }));
    }

    if (isInvalid(teamBuilderName) || isInvalid(teamBuilderMembers)) {
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
        errors: {
          ...state.errors,
          name: "Team name is required"
        }
      }));
    } else {
      this.setState(state => ({
        errors: unset("name", { ...state.errors })
      }));
    }

    if (isInvalid(teamBuilderMembers)) {
      this.setState(state => ({
        errors: {
          ...state.errors,
          members: "Your team must have some pokemon"
        }
      }));
    } else {
      this.setState(state => ({
        errors: unset("members", { ...state.errors })
      }));
    }
  }

  public render() {
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
    const numberOfMembersInTeam = keys(teamBuilderMembers).length;
    const nameErrorMessage = propOr(undefined, "name", this.state.errors);
    const nameHasError = this.state.isTouched && !!nameErrorMessage;

    if (createdTeamId) {
      return <Redirect to={`/team/edit/${createdTeamId}`} />;
    }

    return (
      <Fragment>
        <Heading>Create a Team</Heading>
        <SectionContainer>
          <CenteredRow stackVertically={true}>
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
                setCurrentSearchPokemon={setCurrentSearchPokemon}
              />
            </CenteredRow>,
            currentSearchPokemonName && (
              <CenteredRow key="Add member button">
                <CtaButton
                  secondary={true}
                  onClick={this.handleAddPokemonToTeam}
                >
                  {`Add ${currentSearchPokemonName} to your team`}
                </CtaButton>
              </CenteredRow>
            )
          ]}

          {gt(numberOfMembersInTeam, 0) && [
            <CenteredRow key="Team members">
              <PokemonGrid>
                {teamBuilderMembers &&
                  Object.keys(teamBuilderMembers).map(id => {
                    const { pokemon: pkmn } = teamBuilderMembers[id];
                    const renderCardActions = () => (
                      <CtaButton
                        secondary={true}
                        small={true}
                        onClick={this.handleRemovePokemonFromTeam(id)}
                      >
                        {`Remove ${pkmn.name} from team`}
                      </CtaButton>
                    );
                    return (
                      <PokemonCard
                        key={id}
                        memberId={id}
                        pokemon={pkmn}
                        renderCardActions={renderCardActions}
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
