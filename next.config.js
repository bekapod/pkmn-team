const withPlugins = require("next-compose-plugins");
const withTypescript = require("@zeit/next-typescript");

const nextConfig = {
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: "empty",
      module: "empty"
    };

    return config;
  }
};

module.exports = withPlugins([[withTypescript]], nextConfig);
