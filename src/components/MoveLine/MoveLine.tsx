import styled from 'styled-components/macro';
import isEqual from 'react-fast-compare';
import { HTMLAttributes, memo } from 'react';
import { TypeTag } from '../TypeTag';
import { Label } from '../Label';
import { InlineList } from '../InlineList';
import { getTypeGradient } from '~/lib/gradients';
import { Move, Type } from '~/generated/graphql';

type RowProps = {
  types: Pick<Type, 'name' | 'slug'>[];
};

export type MoveLineProps = Move & HTMLAttributes<HTMLDivElement>;

const Row = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 3fr 2fr 2fr 2fr 3fr;
  padding: 0 var(--spacing-md);
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
    top: calc(var(--spacing-xs) / 2 * -1);
    display: block;
    width: 100%;
    height: var(--spacing-xs);
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

const TypeList = styled(InlineList)`
  align-items: center;
  justify-content: flex-end;
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
      <TypeList>
        {!!type && (
          <TypeTag key={type.slug} type={type.slug}>
            {type.name}
          </TypeTag>
        )}
        <TypeTag type={damageClass}>{damageClass}</TypeTag>
      </TypeList>
    </Row>
  ),
  isEqual
);
