import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import renderer from "react-test-renderer";
import TeamCard from ".";

describe("<TeamCard />", () => {
  it("renders without crashing", () => {
    const tree = renderer.create(
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
        }}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
