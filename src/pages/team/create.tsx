import type { NextComponentType } from 'next';
import { NextUrqlPageContext, withUrqlClient } from 'next-urql';
import { createClient } from '~/lib/client';
import { FullWidthContainer } from '~/components/FullWidthContainer';
import { Page } from '~/components/Page';

const TeamCreate: NextComponentType<NextUrqlPageContext> = () => {
  return (
    <Page title="Create a team" metaTitle="Create a team | Team | Pkmn Team">
      <FullWidthContainer></FullWidthContainer>
    </Page>
  );
};

export default withUrqlClient(createClient, { ssr: false })(TeamCreate);
