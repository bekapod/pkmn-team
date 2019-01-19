import { ApolloError } from "apollo-client";
import { get, getOr, gt, propOr, size } from "lodash/fp";
import React, { ChangeEvent, Component } from "react";
import { Redirect } from "react-router-dom";
import TeamView from "../../containers/TeamView";
import withScrollToTop from "../../hocs/withScrollToTop";
import { ITeam, ITeamMember } from "../../types";
import CenteredRow from "../CenteredRow";
import { CtaButton } from "../Cta";
import ErrorMessage from "../ErrorMessage";
import GiantInput from "../GiantInput";
import LoadingIcon from "../LoadingIcon";
import { validate } from "./helpers";

interface IProps {
  team?: ITeam;
  createdTeamId?: string;
  loading?: boolean;
  error?: ApolloError;
  createTeamMutation: (
    mutation: {
      variables: {
        name: string;
        pokedexIds: number[];
      };
    }
  ) => void;
  updateTeamMutation: (
    mutation: {
      variables: {
        id: string;
        name: string;
        pokedexIds: number[];
      };
    }
  ) => void;
  setTeamName: (name: string) => void;
  setTeamMembers: (members: ITeamMember[]) => void;
  teamBuilderName?: string;
  teamBuilderMembers?: ITeamMember[];
  scrollToTop?: () => void;
}

interface IState {
  isValid: boolean;
  isTouched: boolean;
  errors: { [key: string]: string };
}

class TeamBuilder extends Component<IProps, IState> {
  public static getDerivedStateFromProps(props: IProps, state: IState) {
    const { teamBuilderName, teamBuilderMembers } = props;
    return validate({ teamBuilderName, teamBuilderMembers }, state);
  }

  public state = {
    errors: {},
    isTouched: false,
    isValid: false
  };

  constructor(props: IProps) {
    super(props);

    this.handleTeamNameChange = this.handleTeamNameChange.bind(this);
    this.handleUpsertTeam = this.handleUpsertTeam.bind(this);

    if (props.team) {
      const { name, members } = props.team;
      props.setTeamName(name);
      props.setTeamMembers(members);
    } else {
      props.setTeamName("");
      props.setTeamMembers([]);
    }
  }

  public handleTeamNameChange(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    this.props.setTeamName(value);

    this.setState(() => ({
      isTouched: true
    }));
  }

  public handleUpsertTeam() {
    const {
      team,
      createTeamMutation,
      updateTeamMutation,
      teamBuilderName,
      teamBuilderMembers
    } = this.props;
    const teamId = getOr(undefined, "id", team);

    if (this.state.isValid && teamBuilderName && teamBuilderMembers) {
      const pokedexIds = teamBuilderMembers.map(get(["pokemon", "pokedexId"]));

      if (teamId) {
        updateTeamMutation({
          variables: {
            id: teamId,
            name: teamBuilderName,
            pokedexIds
          }
        });
      } else {
        createTeamMutation({
          variables: {
            name: teamBuilderName,
            pokedexIds
          }
        });
      }
    } else if (this.props.scrollToTop) {
      this.setState({ isTouched: true });
      this.props.scrollToTop();
    }
  }

  public render() {
    const {
      team,
      teamBuilderMembers,
      teamBuilderName,
      createdTeamId,
      loading,
      error
    } = this.props;
    const nameErrorMessage = propOr(undefined, "name", this.state.errors);
    const nameHasError = this.state.isTouched && !!nameErrorMessage;

    if (createdTeamId) {
      return <Redirect to={`/team/edit/${createdTeamId}`} />;
    }

    return (
      <>
        <CenteredRow stackVertically={true}>
          <GiantInput
            aria-label="Choose a team name"
            placeholder="Choose a team name"
            onChange={this.handleTeamNameChange}
            value={teamBuilderName}
            isInvalid={nameHasError}
          />

          {this.state.isTouched && nameHasError && nameErrorMessage && (
            <ErrorMessage>{nameErrorMessage}</ErrorMessage>
          )}

          {gt(size(teamBuilderMembers), 0) && [
            !!error && (
              <CenteredRow key="Error">
                <ErrorMessage>{error.message}</ErrorMessage>
              </CenteredRow>
            ),
            loading && !error ? (
              <CenteredRow key="Loading">
                <LoadingIcon spinner={true} />
              </CenteredRow>
            ) : (
              <CenteredRow key={team ? "Save button" : "Create button"}>
                <CtaButton onClick={this.handleUpsertTeam}>
                  {team ? "Save team" : "Create this team!"}
                </CtaButton>
              </CenteredRow>
            )
          ]}
        </CenteredRow>

        <TeamView />
      </>
    );
  }
}

export default withScrollToTop(TeamBuilder);
