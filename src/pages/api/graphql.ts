import { createProxyMiddleware } from 'http-proxy-middleware';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true
  }
};

const proxy = createProxyMiddleware({
  target: process.env.FAUNA_GRAPHQL_ENDPOINT,
  headers: {
    Authorization: `Bearer ${process.env.FAUNA_TOKEN}`
  },
  pathRewrite: {
    '^/api': ''
  },
  logLevel: 'debug'
});

export default proxy;
