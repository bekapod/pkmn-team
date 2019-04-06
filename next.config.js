const path = require("path");
const withTypescript = require("@zeit/next-typescript");

require("dotenv").config();
const dotEnv = require("dotenv-webpack");

if (dotEnv.error) {
  throw dotEnv.error;
}

const nextConfig = withTypescript({
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: "empty",
      module: "empty"
    };

    config.plugins = [
      ...config.plugins,
      new dotEnv({
        path: path.join(__dirname, ".env"),
        systemvars: true
      })
    ];

    return config;
  }
});

module.exports = nextConfig;
