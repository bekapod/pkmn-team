import { createProxyMiddleware } from 'http-proxy-middleware';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true
  }
};

const proxy = createProxyMiddleware({
  target: process.env.INTERNAL_GRAPHQL_ENDPOINT,
  pathRewrite: {
    '^/api': ''
  },
  logLevel: 'debug'
});

export default proxy;
