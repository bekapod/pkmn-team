import { ComponentPropsWithRef, forwardRef, FunctionComponent } from 'react';
import classNames from 'classnames';
import { TypeTag } from '../TypeTag';
import { Label } from '../Label';
import { InlineList } from '../InlineList';
import { getTypeGradient } from '~/lib/gradients';
import { Moves } from '~/generated/graphql';

export type MoveLineProps = ComponentPropsWithRef<'div'> &
  Moves & {
    isOpen?: boolean;
    isHighlighted?: boolean;
    isCompressed?: boolean;
    isSpacious?: boolean;
    renderLineActions?: () => JSX.Element;
  };

const printStat = (stat?: string | number | null) => `${stat ?? '-'}`;

export const MoveLine: FunctionComponent<MoveLineProps> = forwardRef(
  (
    {
      __typename,
      name,
      slug,
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
      isCompressed = false,
      isSpacious = false,
      renderLineActions,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={classNames(
          'move-line-template',
          'relative',
          'gap-x-4',
          'gap-y-3',
          'items-center',
          'p-4',
          {
            'move-line-template-compressed': isCompressed,
            'bg-yellow-vivid-100': isHighlighted
          }
        )}
        style={{
          ...style,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          '--type-gradient': getTypeGradient(
            damage_class
              ? [{ name: damage_class.value, slug: damage_class.value }].concat(
                  type
                )
              : [type]
          )
        }}
        aria-expanded={isOpen}
        aria-selected={isHighlighted}
        ref={ref}
        {...props}
      >
        <div>
          <Label className={classNames('text-indigo-900', 'leading-none')}>
            {name}
          </Label>
        </div>
        <InlineList
          className={classNames('flex', 'flex-grow', 'children:not-last:mr-2', {
            'justify-end': !isSpacious,
            'justify-center': isSpacious
          })}
        >
          <TypeTag as="li" key={type.slug} typeSlug={type.slug}>
            {type.name}
          </TypeTag>
          {!!damage_class && (
            <TypeTag as="li" typeSlug={damage_class.value}>
              {damage_class.value}
            </TypeTag>
          )}
        </InlineList>

        {renderLineActions && (
          <div
            className={classNames(
              'move-line-template-actions',
              'flex',
              'justify-end',
              'children:not-last:mr-2'
            )}
          >
            {renderLineActions()}
          </div>
        )}

        {isOpen && (
          <div
            className={classNames(
              'move-line-template-details',
              'flex',
              'flex-wrap',
              'justify-between',
              'col-span-3',
              'self-start'
            )}
          >
            <div
              className={classNames('mr-3', 'font-bold', 'whitespace-nowrap')}
            >
              <Label>PP</Label>
              <span
                className={classNames(
                  'text-indigo-900',
                  'leading-none',
                  'ml-2'
                )}
              >
                {printStat(pp)}
              </span>
            </div>

            <div
              className={classNames('mr-3', 'font-bold', 'whitespace-nowrap')}
            >
              <Label>Accuracy</Label>
              <span
                className={classNames(
                  'text-indigo-900',
                  'leading-none',
                  'ml-2'
                )}
              >
                {printStat(accuracy)}
              </span>
            </div>

            <div
              className={classNames('mr-3', 'font-bold', 'whitespace-nowrap')}
            >
              <Label>Power</Label>
              <span
                className={classNames(
                  'text-indigo-900',
                  'leading-none',
                  'ml-2'
                )}
              >
                {printStat(power)}
              </span>
            </div>

            <div
              className={classNames('mr-3', 'font-bold', 'whitespace-nowrap')}
            >
              <Label>Target</Label>
              <span
                className={classNames(
                  'text-indigo-900',
                  'leading-none',
                  'ml-2'
                )}
              >
                {printStat(target)}
              </span>
            </div>

            <p className={classNames('w-full', 'mt-2', 'mb-0')}>{effect}</p>
          </div>
        )}
      </div>
    );
  }
);
