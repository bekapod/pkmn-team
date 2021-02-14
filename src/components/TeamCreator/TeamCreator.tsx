import type { ComponentPropsWithoutRef, FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { CenteredRow } from '../CenteredRow';
import { CtaButton } from '../Cta';
import { FormField } from '../FormField';
import { GiantInput } from '../GiantInput';

export type TeamCreatorFormValues = {
  'team-name': string;
};

export type TeamCreatorProps = ComponentPropsWithoutRef<'form'> & {
  defaultValues?: Partial<TeamCreatorFormValues>;
  isLoading?: boolean;
  createTeam?: (values: TeamCreatorFormValues) => void;
};

export const TeamCreator: FunctionComponent<TeamCreatorProps> = ({
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
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <FormField
        label="Team name"
        id="team-name"
        error={error}
        className="items-center"
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
