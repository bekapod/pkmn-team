import { Moves } from '~/generated/graphql';
import { normal, psychic } from './Types';

export const substitute: Moves = {
  id: '623bcd4a-da0d-4b47-9b4b-96601d465cc1',
  name: 'Substitute',
  slug: 'substitute',
  type: normal,
  power: null,
  accuracy: null,
  pp: 10,
  target: 'User',
  damage_class: {
    value: 'status'
  },
  effect:
    "Transfers 1/4 of the user's max HP into a doll, protecting the user from further damage or status changes until it breaks."
};

export const slash: Moves = {
  id: '38335f1b-6c2c-4e63-b046-d9c57edb2501',
  name: 'Slash',
  slug: 'slash',
  type: normal,
  power: 70,
  accuracy: 100,
  pp: 20,
  target: 'Selected Pokémon',
  damage_class: {
    value: 'physical'
  },
  effect: 'Has an increased chance for a critical hit.'
};

export const rest: Moves = {
  id: 'b85adec9-3993-436e-b5bd-78056a14c617',
  name: 'Rest',
  slug: 'rest',
  type: psychic,
  power: null,
  accuracy: null,
  pp: 10,
  target: 'User',
  damage_class: {
    value: 'status'
  },
  effect: 'User sleeps for two turns, completely healing itself.'
};

export const flash: Moves = {
  id: '44560082-e180-4a5c-9e65-ceb8251935c6',
  name: 'Flash',
  slug: 'flash',
  type: normal,
  power: null,
  accuracy: 100,
  pp: 20,
  target: 'Selected Pokémon',
  damage_class: {
    value: 'status'
  },
  effect: "Lowers the target's accuracy by one stage."
};

export const explosion: Moves = {
  id: '226c7a31-fcbd-4557-b432-8abe86767879',
  name: 'Explosion',
  slug: 'explosion',
  type: normal,
  power: 250,
  accuracy: 100,
  pp: 5,
  target: 'All other Pokémon',
  damage_class: {
    value: 'physical'
  },
  effect: 'User faints.'
};
