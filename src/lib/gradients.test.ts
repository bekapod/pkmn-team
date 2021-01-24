import { electric, ghost, psychic } from '~/mocks/Types';
import * as gradients from './gradients';

describe('gradients lib', () => {
  describe(gradients.getTypeGradient, () => {
    it('returns a gradient of type colours', () => {
      expect(
        gradients.getTypeGradient([electric, psychic, electric, ghost])
      ).toBe(
        'linear-gradient(90deg, var(--color-electric) 0%, var(--color-electric) 25%, var(--color-electric) 25%, var(--color-electric) 50%, var(--color-ghost) 50%, var(--color-ghost) 75%, var(--color-psychic) 75%, var(--color-psychic) 100%)'
      );
    });
  });
});
