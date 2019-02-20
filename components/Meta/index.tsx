import Head from "next/head";

interface IProps {
  title: string;
}

const Meta = ({ title }: IProps) => (
  <Head>
    <meta charSet="utf-8" />
    <link rel="shortcut icon" href="/static/favicon.ico" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <meta name="theme-color" content="#000000" />
    <link rel="manifest" href="/static/manifest.json" />
    <link rel="stylesheet" href="https://use.typekit.net/jdl7nve.css" />
    <link rel="stylesheet" href="https://basehold.it/33" />
    <title>{`${title} - Pkmn Team`}</title>
  </Head>
);

export default Meta;
