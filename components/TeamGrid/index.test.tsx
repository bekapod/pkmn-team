import React from "react";
import { render } from "react-testing-library";
import TeamCard from "../TeamCard";
import TeamGrid from ".";

describe("<TeamGrid />", (): void => {
  it("renders children", (): void => {
    const { getAllByText } = render(
      <TeamGrid>
        <TeamCard
          team={{
            createdAt: "2018-06-08T21:15:14.723Z",
            id: "1",
            members: [
              {
                id: "1",
                order: 1,
                pokemon: {
                  id: "25",
                  name: "Pikachu",
                  slug: "pikachu",
                  pokedexId: 25,
                  sprite: "25.png",
                  types: [{ name: "Electric", slug: "electric" }]
                }
              }
            ],
            name: "Pikachu Team"
          }}
        />
        <TeamCard
          team={{
            createdAt: "2018-06-08T21:15:14.723Z",
            id: "2",
            members: [
              {
                id: "1",
                order: 1,
                pokemon: {
                  id: "25",
                  name: "Pikachu",
                  slug: "pikachu",
                  pokedexId: 25,
                  sprite: "25.png",
                  types: [{ name: "Electric", slug: "electric" }]
                }
              }
            ],
            name: "Pikachu Team"
          }}
        />
      </TeamGrid>
    );

    expect(getAllByText(/Pikachu Team/)).toHaveLength(2);
  });
});
