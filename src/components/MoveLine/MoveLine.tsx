import styled from 'styled-components/macro';
import isEqual from 'react-fast-compare';
import { HTMLAttributes, memo } from 'react';
import { TypeTag } from '../TypeTag';
import { Label } from '../Label';
import { InlineList } from '../InlineList';
import { CtaButton } from '../Cta';
import { getTypeGradient } from '~/lib/gradients';
import { Move, Type } from '~/generated/graphql';

type RowProps = {
  types: Pick<Type, 'name' | 'slug'>[];
};

export type MoveLineProps = Move & HTMLAttributes<HTMLDivElement>;

const Row = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: var(--spacing-md);
  align-items: center;
  padding: var(--spacing-md);

  .is-compressed-list & {
    grid-template: 1fr 1fr / 1fr 1fr;
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
  line-height: 1;

  &:nth-child(even) {
    margin-left: var(--spacing-xs);
  }
`;

const TypeList = styled(InlineList)`
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
  margin: 0;
  padding-left: 0;
  list-style: none;

  .is-spacious-list & {
    justify-content: center;
  }

  > * {
    margin-right: var(--spacing-sm);

    &:last-child {
      margin-right: 0;
    }
  }
`;

const Actions = styled.ul`
  display: flex;
  justify-content: flex-end;
  margin: 0;
  padding-left: 0;
  list-style: none;

  .is-compressed-list & {
    width: 100%;
    grid-column: span 2;
    justify-content: space-between;
  }

  > * {
    margin-right: var(--spacing-sm);

    &:last-child {
      margin-right: 0;
    }
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
      <TypeList>
        {!!type && (
          <TypeTag as="li" key={type.slug} type={type.slug}>
            {type.name}
          </TypeTag>
        )}
        <TypeTag as="li" type={damageClass}>
          {damageClass}
        </TypeTag>
      </TypeList>

      <Actions>
        <li>
          <CtaButton type="button" size="tiny">
            Learn
          </CtaButton>
        </li>
        <li>
          <CtaButton type="button" size="tiny" secondary>
            Details
          </CtaButton>
        </li>
      </Actions>
    </Row>
  ),
  isEqual
);
