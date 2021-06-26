import type { FunctionComponent } from 'react';
import classNames from 'classnames';
import { Label } from '../Label';

export type CardMetaProps = {
  items?: {
    label: string;
    value: string | number;
  }[];
};

export const CardMeta: FunctionComponent<CardMetaProps> = ({ items = [] }) => (
  <dl role="associationlist" className={classNames('flex', 'my-4')}>
    {items.map(({ label, value }, idx) => (
      <div
        className={classNames(
          'relative',
          'flex',
          'flex-col',
          'flex-grow',
          'flex-shrink-0',
          'items-center',
          'text-center'
        )}
        key={label}
      >
        <Label
          className={classNames('mb-1')}
          as="dt"
          role="associationlistitemkey"
          aria-label={label}
        >
          {label}
        </Label>
        <dd
          role="associationlistitemvalue"
          aria-label={value.toString()}
          className={classNames(
            'm-0',
            'text-indigo-800',
            'text-lg',
            'font-black'
          )}
        >
          {value}
        </dd>
        {idx !== items.length - 1 && (
          <span
            role="presentation"
            className={classNames(
              'block',
              'absolute',
              '-right-1',
              'top-1/2',
              'w-2',
              'h-5',
              'bg-indigo-100',
              '-translate-y-1/2',
              'transform-gpu',
              'rounded-xl'
            )}
          />
        )}
      </div>
    ))}
  </dl>
);
