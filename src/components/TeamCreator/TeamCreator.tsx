import type { ComponentPropsWithoutRef, FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { CenteredRow } from '../CenteredRow';
import { CtaButton } from '../Cta';
import { FormField } from '../FormField';
import { GiantInput } from '../GiantInput';
import { useContainerQuery } from '~/hooks/useContainerQuery';

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
  className,
  ...props
}) => {
  const [ref, cn] = useContainerQuery({
    'is-small': {
      minWidth: 0,
      maxWidth: 550
    }
  });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TeamCreatorFormValues>({
    defaultValues
  });
  const error = errors['team-name']?.message;
  const onSubmit = (values: TeamCreatorFormValues) => createTeam?.(values);

  return (
    <CenteredRow
      ref={ref}
      as="form"
      stackVertically={cn.includes('is-small')}
      onSubmit={handleSubmit(onSubmit)}
      className={classNames('items-start', className)}
      {...props}
    >
      <FormField
        label={<span className="sr-only">Team name</span>}
        id="team-name"
        error={error}
        className="flex-1"
      >
        <GiantInput
          id="team-name"
          isInvalid={!!error}
          aria-required="true"
          disabled={isLoading}
          className={classNames('max-w-none', {
            'text-center': cn.includes('is-small')
          })}
          placeholder="Team name"
          {...register('team-name', {
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
