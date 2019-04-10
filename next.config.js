/* eslint-disable @typescript-eslint/no-var-requires, no-param-reassign */
const path = require("path");
const withPlugins = require("next-compose-plugins");
const withTypescript = require("@zeit/next-typescript");
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");

require("dotenv").config();
const DotEnv = require("dotenv-webpack");

if (DotEnv.error) {
  throw DotEnv.error;
}

const nextConfig = {
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: "empty",
      module: "empty"
    };

    config.plugins = [
      ...config.plugins,
      new DotEnv({
        path: path.join(__dirname, ".env"),
        systemvars: true
      })
    ];

    return config;
  }
};

module.exports = withPlugins(
  [
    [withTypescript],
    [
      withBundleAnalyzer,
      {
        analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
        analyzeBrowser: ["browser", "both"].includes(
          process.env.BUNDLE_ANALYZE
        ),
        bundleAnalyzerConfig: {
          server: {
            analyzerMode: "static",
            reportFilename: "../bundles/server.html"
          },
          browser: {
            analyzerMode: "static",
            reportFilename: "./bundles/client.html"
          }
        }
      }
    ]
  ],
  nextConfig
);
