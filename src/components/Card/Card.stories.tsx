import { Meta, Story } from '@storybook/react/types-6-0';
import {
  CardLink,
  CardWrapper,
  CardHeader,
  CardHeading,
  CardContent
} from './Card';

export default {
  title: 'Components/Card',
  subcomponents: { CardLink, CardWrapper, CardHeader, CardHeading, CardContent }
} as Meta;

export const card: Story = () => (
  <CardLink href="/">
    <CardWrapper>
      <CardHeader
        types={[
          { name: 'Electric', slug: 'electric' },
          { name: 'Psychic', slug: 'psychic' }
        ]}
      >
        <CardHeading>Cupcake ipsum dolor sit amet</CardHeading>
      </CardHeader>
      <CardContent>
        <p>
          Jelly jelly-o fruitcake jujubes muffin cotton candy bonbon jelly-o
          danish. Bonbon sugar plum candy gummi bears lemon drops dragée.
          Chocolate bar tootsie roll bonbon gummi bears cotton candy halvah
          soufflé tart. Jelly beans jelly tart lemon drops. Fruitcake candy
          cookie croissant pie. Lollipop liquorice chocolate bar chupa chups
          chupa chups. Jelly-o ice cream marzipan cheesecake sweet sweet cake
          danish. Soufflé chocolate bar cupcake sesame snaps chocolate cotton
          candy icing brownie. Ice cream danish muffin biscuit cotton candy
          cheesecake oat cake cookie chocolate cake. Bonbon brownie marzipan
          sugar plum cheesecake gummi bears icing icing. Marshmallow dessert
          lollipop chocolate cake cupcake. Danish liquorice muffin lemon drops
          cake chupa chups marshmallow sweet roll jelly.
        </p>
      </CardContent>
    </CardWrapper>
  </CardLink>
);
