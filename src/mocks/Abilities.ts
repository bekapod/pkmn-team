import { Abilities } from '~/generated/graphql';

export const blaze: Abilities = {
  id: '995cd36d-1dde-4c6c-91ef-fea2c7151772',
  name: 'Blaze',
  slug: 'blaze',
  effect: 'Strengthens fire moves to inflict 1.5× damage at 1/3 max HP or less.'
};

export const solarPower: Abilities = {
  id: '6bea2478-59a8-44d3-b234-924913fe5c63',
  name: 'Solar Power',
  slug: 'solar-power',
  effect:
    'Increases Special Attack to 1.5× but costs 1/8 max HP after each turn during strong sunlight.'
};

export const staticc: Abilities = {
  id: '1a692dac-feca-400b-8936-1a06cc526512',
  name: 'Static',
  slug: 'static',
  effect: 'Has a 30% chance of paralyzing attacking Pokémon on contact.'
};

export const lightningRod: Abilities = {
  id: '6d39d355-962a-497c-a30f-bdd0d9b68977',
  name: 'Lightning Rod',
  slug: 'lightning-rod',
  effect:
    'Redirects single-target electric moves to this Pokémon where possible.  Absorbs Electric moves, raising Special Attack one stage.'
};

export const levitate: Abilities = {
  id: '7f5e1f46-146a-43c4-bbc2-bc8c07733ad3',
  name: 'Levitate',
  slug: 'levitate',
  effect: 'Evades ground moves.'
};
