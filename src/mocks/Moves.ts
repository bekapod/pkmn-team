import { DamageClass, MoveFragment, MoveTarget } from '~/generated/graphql';
import { normal, psychic } from './Types';

export const substitute: MoveFragment = {
  id: '623bcd4a-da0d-4b47-9b4b-96601d465cc1',
  name: 'Substitute',
  slug: 'substitute',
  type: {
    ...normal,
    noDamageTo: { edges: [] },
    halfDamageTo: { edges: [] },
    doubleDamageTo: { edges: [] }
  },
  power: null,
  accuracy: null,
  pp: 10,
  target: MoveTarget.User,
  damageClass: DamageClass.Status,
  effect:
    "Transfers 1/4 of the user's max HP into a doll, protecting the user from further damage or status changes until it breaks."
};

export const slash: MoveFragment = {
  id: '38335f1b-6c2c-4e63-b046-d9c57edb2501',
  name: 'Slash',
  slug: 'slash',
  type: {
    ...normal,
    noDamageTo: { edges: [] },
    halfDamageTo: { edges: [] },
    doubleDamageTo: { edges: [] }
  },
  power: 70,
  accuracy: 100,
  pp: 20,
  target: MoveTarget.SelectedPokemon,
  damageClass: DamageClass.Physical,
  effect: 'Has an increased chance for a critical hit.'
};

export const rest: MoveFragment = {
  id: 'b85adec9-3993-436e-b5bd-78056a14c617',
  name: 'Rest',
  slug: 'rest',
  type: {
    ...psychic,
    noDamageTo: { edges: [] },
    halfDamageTo: { edges: [] },
    doubleDamageTo: { edges: [] }
  },
  power: null,
  accuracy: null,
  pp: 10,
  target: MoveTarget.User,
  damageClass: DamageClass.Status,
  effect: 'User sleeps for two turns, completely healing itself.'
};

export const flash: MoveFragment = {
  id: '44560082-e180-4a5c-9e65-ceb8251935c6',
  name: 'Flash',
  slug: 'flash',
  type: {
    ...normal,
    noDamageTo: { edges: [] },
    halfDamageTo: { edges: [] },
    doubleDamageTo: { edges: [] }
  },
  power: null,
  accuracy: 100,
  pp: 20,
  target: MoveTarget.SelectedPokemon,
  damageClass: DamageClass.Status,
  effect: "Lowers the target's accuracy by one stage."
};

export const explosion: MoveFragment = {
  id: '226c7a31-fcbd-4557-b432-8abe86767879',
  name: 'Explosion',
  slug: 'explosion',
  type: {
    ...normal,
    noDamageTo: { edges: [] },
    halfDamageTo: { edges: [] },
    doubleDamageTo: { edges: [] }
  },
  power: 250,
  accuracy: 100,
  pp: 5,
  target: MoveTarget.AllOtherPokemon,
  damageClass: DamageClass.Physical,
  effect: 'User faints.'
};
