import type {
  ComponentPropsWithRef,
  ElementType,
  FunctionComponent
} from 'react';
import cx from 'classnames';

export type CenteredRowProps = ComponentPropsWithRef<ElementType> & {
  stackVertically?: boolean;
  as?: ElementType;
};

export const CenteredRow: FunctionComponent<CenteredRowProps> = ({
  className,
  stackVertically,
  as: As = 'div',
  ...props
}) => (
  <As
    className={cx('flex', 'mb-5', className, {
      'justify-center children:not-last:mr-3': !stackVertically,
      'flex-col children:not-last:mb-4': stackVertically
    })}
    {...props}
  />
);
