import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import renderer from "react-test-renderer";
import TeamCard from "../TeamCard";
import TeamGrid from "./";

describe("<TeamGrid />", () => {
  it("renders without crashing", () => {
    const tree = renderer.create(
      <TeamGrid>
        <TeamCard
          team={{
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
          }}
        />
      </TeamGrid>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
