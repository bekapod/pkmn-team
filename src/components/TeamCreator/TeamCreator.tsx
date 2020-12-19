import type { ComponentPropsWithoutRef, FunctionComponent } from 'react';
import cx from 'classnames';
import { CenteredRow } from '../CenteredRow';
import { CtaButton } from '../Cta';
import { FormField } from '../FormField';
import { GiantInput } from '../GiantInput';
import styles from './TeamCreator.module.css';

export type TeamCreatorProps = ComponentPropsWithoutRef<'form'>;

export const TeamCreator: FunctionComponent<TeamCreatorProps> = ({
  className,
  ...props
}) => {
  return (
    <CenteredRow
      as="form"
      stackVertically
      className={cx(styles.form, className)}
      {...props}
    >
      <FormField label="Team name" id="team-name" className={styles.field}>
        <GiantInput id="team-name" />
      </FormField>
      <CtaButton>Create team</CtaButton>
    </CenteredRow>
  );
};
