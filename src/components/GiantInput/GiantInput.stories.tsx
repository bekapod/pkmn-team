import { Meta } from '@storybook/react/types-6-0';
import { GiantInput } from './GiantInput';

export default {
  title: 'Components/GiantInput',
  component: GiantInput
} as Meta;

export const Standard = (): JSX.Element => <GiantInput type="text" />;
