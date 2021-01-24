import { withUrqlClient } from 'next-urql';
import Link from 'next/link';
import { useAllTeamsQuery } from '~/generated/graphql';
import { createClient } from '~/lib/client';
import { FullWidthContainer } from '~/components/FullWidthContainer';
import { Page } from '~/components/Page';
import { TeamGrid } from '~/components/TeamGrid';
import { TeamCard } from '~/components/TeamCard';
import { CenteredRow } from '~/components/CenteredRow';
import { CtaLink } from '~/components/Cta';

function Home(): JSX.Element {
  const [{ data }] = useAllTeamsQuery();
  return (
    <Page title="Dashboard" metaTitle="Pkmn Team">
      <FullWidthContainer>
        <CenteredRow>
          <Link href="/team/create" passHref>
            <CtaLink>Create your own team</CtaLink>
          </Link>
        </CenteredRow>
        <TeamGrid as="ul" role="list" className="u-unstyled-list">
          {data?.teams.map(team => (
            <li key={team.id}>
              <TeamCard {...team} />
            </li>
          ))}
        </TeamGrid>
      </FullWidthContainer>
    </Page>
  );
}

export default withUrqlClient(createClient, { ssr: true })(Home);
