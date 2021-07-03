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
    '^/api/graphql': ''
  },
  changeOrigin: true,
  logLevel: process.env.NODE_ENV === 'development' ? 'debug' : 'info'
});

export default proxy;
