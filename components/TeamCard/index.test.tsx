import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import { fireEvent, render } from "react-testing-library";
import TeamCard from ".";
import { Team } from "../../types";

describe("<TeamCard />", () => {
  const team: Team = {
    createdAt: "2018-06-08T21:15:14.723Z",
    id: "1",
    members: [
      {
        id: "1",
        order: 1,
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
        order: 2,
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
        order: 3,
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
    const { queryByText, getAllByText } = render(<TeamCard team={team} />);

    expect(queryByText(/Pikachu Team/)).toBeTruthy();
    expect(getAllByText(/#25 Pikachu/)).toHaveLength(3);
  });

  it("renders a link to team edit page", () => {
    const { getByTestId } = render(<TeamCard team={team} />);

    expect(
      global.appHistory.find(entry => entry === `/team/edit/${team.id}/`)
    ).toBeFalsy();

    fireEvent.click(getByTestId(`team-link-${team.id}`));

    expect(
      global.appHistory.find(entry => entry === `/team/edit/${team.id}/`)
    ).toBeTruthy();
  });
});
