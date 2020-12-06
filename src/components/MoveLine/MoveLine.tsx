import styled from 'styled-components/macro';
import isEqual from 'react-fast-compare';
import { memo } from 'react';
import { TypeTag } from '../TypeTag';
import { Label } from '../Label';
import { getTypeGradient } from '~/lib/gradients';
import { Move, Type } from '~/generated/graphql';

type RowProps = {
  types: Pick<Type, 'name' | 'slug'>[];
};

export type MoveLineProps = Move;

const Row = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 3fr 2fr 2fr 2fr 3fr;
  line-height: var(--spacing-xl);
  text-align: center;
  > :first-child {
    text-align: left;
  }
  > :last-child {
    text-align: right;
  }
  &::before {
    content: '';
    position: absolute;
    top: calc(var(--spacing-sm) / 2 * -1);
    display: block;
    width: 100%;
    height: var(--spacing-sm);
    background-image: ${({ types }: RowProps): string =>
      getTypeGradient(types)};
  }
`;

const Value = styled(Label)`
  color: var(--color-gray-darker);
  font-size: var(--font-size-sm);

  &:nth-child(even) {
    margin-left: var(--spacing-xs);
  }
`;

export const MoveLine = memo<MoveLineProps>(
  ({ name, type, damageClass, pp, accuracy, power, ...props }) => (
    <Row
      types={[{ name: damageClass, slug: damageClass }].concat(type ?? [])}
      {...props}
    >
      <div>
        <Value>{name}</Value>
      </div>
      <div>
        <Label>PP</Label>
        <Value>{pp}</Value>
      </div>
      <div>
        <Label>Accuracy</Label>
        <Value>{accuracy || 'n/a'}</Value>
      </div>
      <div>
        <Label>Power</Label>
        <Value>{power || 'n/a'}</Value>
      </div>
      <div>
        {!!type && (
          <TypeTag key={type.slug} type={type.slug}>
            {type.name}
          </TypeTag>
        )}
        <TypeTag type={damageClass}>{damageClass}</TypeTag>
      </div>
    </Row>
  ),
  isEqual
);
