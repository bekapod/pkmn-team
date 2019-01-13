import React from "react";
import { MemoryRouter } from "react-router-dom";
// tslint:disable-next-line:no-implicit-dependencies
import { fireEvent, render } from "react-testing-library";
import TeamCard from ".";
import { renderWithRouter } from "../../helpers/testUtils";
import { ITeam } from "../../types";

describe("<TeamCard />", () => {
  const team: ITeam = {
    createdAt: "2018-06-08T21:15:14.723Z",
    id: "1",
    members: [
      {
        id: "1",
        pokemon: {
          id: "25",
          name: "pikachu",
          pokedexId: 25,
          sprite: "25.png",
          types: ["ELECTRIC"]
        }
      },
      {
        id: "2",
        pokemon: {
          id: "25",
          name: "pikachu",
          pokedexId: 25,
          sprite: "25.png",
          types: ["ELECTRIC"]
        }
      },
      {
        id: "3",
        pokemon: {
          id: "25",
          name: "pikachu",
          pokedexId: 25,
          sprite: "25.png",
          types: ["ELECTRIC"]
        }
      }
    ],
    name: "Pikachu Team"
  };

  it("renders team name and pokemon", () => {
    const { queryByText, getAllByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <TeamCard team={team} />
      </MemoryRouter>
    );

    expect(queryByText(/Pikachu Team/)).toBeTruthy();
    expect(getAllByText(/#25 Pikachu/)).toHaveLength(3);
  });

  it("renders a link to team edit page", () => {
    const { getByTestId, history } = renderWithRouter(<TeamCard team={team} />);

    expect(
      history.entries.find(entry => entry.pathname === `/team/edit/${team.id}`)
    ).toBeFalsy();

    fireEvent.click(getByTestId(`team-link-${team.id}`));

    expect(
      history.entries.find(entry => entry.pathname === `/team/edit/${team.id}`)
    ).toBeTruthy();
  });
});
