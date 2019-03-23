module.exports = async ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve("babel-loader")
  });
  config.resolve.extensions.push(".ts", ".tsx");
  console.log(config.entry);
  return config;
};
