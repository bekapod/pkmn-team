import styled from 'styled-components/macro';
import isEqual from 'react-fast-compare';
import { HTMLAttributes, memo } from 'react';
import { TypeTag } from '../TypeTag';
import { Label } from '../Label';
import { InlineList } from '../InlineList';
import { getTypeGradient } from '~/lib/gradients';
import { Moves, Types } from '~/generated/graphql';

type RowProps = HTMLAttributes<HTMLDivElement> & {
  types: Pick<Types, 'name' | 'slug'>[];
  hasPopover: boolean;
  isHighlighted?: boolean;
};

export type MoveLineProps = Moves &
  HTMLAttributes<HTMLDivElement> & {
    isOpen: boolean;
    isHighlighted?: boolean;
    renderLineActions: () => JSX.Element;
  };

const Row = styled.div<RowProps>`
  position: relative;
  display: grid;
  grid-template: ${({ hasPopover }) =>
    hasPopover ? '1fr 2fr / 1fr 1fr 1fr' : '1fr / 1fr 1fr 1fr'};
  grid-column-gap: var(--spacing-md);
  grid-row-gap: var(--spacing-sm);
  align-items: center;
  padding: var(--spacing-md);

  ${({ isHighlighted = false }) =>
    isHighlighted ? `background-color: var(--color-tertiary)` : ''}

  .is-compressed-list & {
    grid-template: ${({ hasPopover }) =>
      hasPopover ? '1fr 1fr 3fr / 1fr 1fr' : '1fr 1fr / 1fr 1fr'};
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

const Stat = styled.div`
  margin-right: var(--spacing-sm);
  white-space: nowrap;
`;

const Value = styled(Label)`
  color: var(--color-gray-darker);
  line-height: 1;

  &:nth-child(even) {
    margin-left: var(--spacing-xs);
  }
`;

const MoveDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  grid-column: span 3;
  align-self: flex-start;

  .is-compressed-list & {
    grid-column: span 2;
  }
`;

const MoveDescription = styled.p`
  width: 100%;
  margin: 0;
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

const Actions = styled.div`
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

const printStat = (stat?: string | number | null) => `${stat ?? '-'}`;

export const MoveLine = memo<MoveLineProps>(
  ({
    name,
    type,
    damage_class,
    pp,
    accuracy,
    power,
    effect,
    target,
    isOpen,
    renderLineActions,
    ...props
  }) => (
    <Row
      types={
        damage_class
          ? [{ name: damage_class.value, slug: damage_class.value }].concat(
              type ?? []
            )
          : [type]
      }
      hasPopover={isOpen}
      {...props}
    >
      <div>
        <Value>{name}</Value>
      </div>
      <TypeList>
        <TypeTag as="li" key={type.slug} type={type.slug}>
          {type.name}
        </TypeTag>
        {!!damage_class && (
          <TypeTag as="li" type={damage_class.value}>
            {damage_class.value}
          </TypeTag>
        )}
      </TypeList>

      <Actions>{renderLineActions()}</Actions>

      {isOpen && (
        <MoveDetails>
          <Stat>
            <Label>PP</Label>
            <Value>{printStat(pp)}</Value>
          </Stat>

          <Stat>
            <Label>Accuracy</Label>
            <Value>{printStat(accuracy)}</Value>
          </Stat>

          <Stat>
            <Label>Power</Label>
            <Value>{printStat(power)}</Value>
          </Stat>

          <Stat>
            <Label>Target</Label>
            <Value>{printStat(target)}</Value>
          </Stat>

          <MoveDescription>{effect}</MoveDescription>
        </MoveDetails>
      )}
    </Row>
  ),
  isEqual
);
