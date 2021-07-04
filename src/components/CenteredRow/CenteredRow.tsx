import {
  ComponentPropsWithRef,
  ElementType,
  forwardRef,
  FunctionComponent
} from 'react';
import classNames from 'classnames';

export type CenteredRowProps = ComponentPropsWithRef<ElementType> & {
  stackVertically?: boolean;
  as?: ElementType;
};

// eslint-disable-next-line react/display-name
export const CenteredRow: FunctionComponent<CenteredRowProps> = forwardRef(
  ({ className, stackVertically, as: As = 'div', ...props }, ref) => (
    <As
      ref={ref}
      className={classNames('flex', 'mb-5', className, {
        'justify-center children:not-last:mr-3': !stackVertically,
        'flex-col items-center children:not-last:mb-4': stackVertically
      })}
      {...props}
    />
  )
);
