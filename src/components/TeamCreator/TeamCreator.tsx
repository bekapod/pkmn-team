import type { ComponentPropsWithoutRef, FunctionComponent } from 'react';
import cx from 'classnames';
import { useForm } from 'react-hook-form';
import { CenteredRow } from '../CenteredRow';
import { CtaButton } from '../Cta';
import { FormField } from '../FormField';
import { GiantInput } from '../GiantInput';
import styles from './TeamCreator.module.css';

export type TeamCreatorFormValues = {
  'team-name': string;
};

export type TeamCreatorProps = ComponentPropsWithoutRef<'form'> & {
  defaultValues?: Partial<TeamCreatorFormValues>;
  isLoading?: boolean;
  createTeam?: (values: TeamCreatorFormValues) => void;
};

export const TeamCreator: FunctionComponent<TeamCreatorProps> = ({
  className,
  defaultValues,
  isLoading,
  createTeam,
  ...props
}) => {
  const { register, handleSubmit, errors } = useForm<TeamCreatorFormValues>({
    defaultValues
  });
  const error = errors['team-name']?.message;

  const onSubmit = (values: TeamCreatorFormValues) => createTeam?.(values);

  return (
    <CenteredRow
      as="form"
      stackVertically
      className={cx(styles.form, className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <FormField
        label="Team name"
        id="team-name"
        className={styles.field}
        error={error}
      >
        <GiantInput
          id="team-name"
          name="team-name"
          isInvalid={!!error}
          aria-required="true"
          disabled={isLoading}
          ref={register({
            required: {
              value: true,
              message: 'You must name your team'
            }
          })}
        />
      </FormField>
      <CtaButton type="submit" aria-busy={isLoading}>
        Create team
      </CtaButton>
    </CenteredRow>
  );
};
