import isEqual from 'react-fast-compare';
import { ComponentPropsWithRef, memo } from 'react';
import { TypeTag } from '../TypeTag';
import { Label } from '../Label';
import { InlineList } from '../InlineList';
import { getTypeGradient } from '~/lib/gradients';
import { Moves } from '~/generated/graphql';
import styles from './MoveLine.module.css';

export type MoveLineProps = Moves & {
  isOpen: boolean;
  isHighlighted?: boolean;
  renderLineActions?: () => JSX.Element;
};

const printStat = (stat?: string | number | null) => `${stat ?? '-'}`;

export const MoveLine = memo<ComponentPropsWithRef<'div'> & MoveLineProps>(
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
    isHighlighted,
    style,
    renderLineActions,
    ...props
  }) => (
    <div
      className={styles.row}
      style={{
        ...style,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        '--type-gradient': getTypeGradient(
          damage_class
            ? [{ name: damage_class.value, slug: damage_class.value }].concat(
                type ?? []
              )
            : [type]
        )
      }}
      aria-expanded={isOpen}
      aria-selected={isHighlighted}
      {...props}
    >
      <div>
        <Label className={styles.value}>{name}</Label>
      </div>
      <InlineList className={styles.types}>
        <TypeTag as="li" key={type.slug} type={type.slug}>
          {type.name}
        </TypeTag>
        {!!damage_class && (
          <TypeTag as="li" type={damage_class.value}>
            {damage_class.value}
          </TypeTag>
        )}
      </InlineList>

      {renderLineActions && (
        <div className={styles.actions}>{renderLineActions()}</div>
      )}

      {isOpen && (
        <div className={styles.details}>
          <div className={styles.stat}>
            <Label>PP</Label>
            <span className={styles.value}>{printStat(pp)}</span>
          </div>

          <div className={styles.stat}>
            <Label>Accuracy</Label>
            <span className={styles.value}>{printStat(accuracy)}</span>
          </div>

          <div className={styles.stat}>
            <Label>Power</Label>
            <span className={styles.value}>{printStat(power)}</span>
          </div>

          <div className={styles.stat}>
            <Label>Target</Label>
            <span className={styles.value}>{printStat(target)}</span>
          </div>

          <p className={styles.description}>{effect}</p>
        </div>
      )}
    </div>
  ),
  isEqual
);
