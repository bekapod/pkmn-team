module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y'
  ],
  babel: config => {
    try {
      const path = require('path');
      const appDirectory = process.cwd();
      const tsConfig = require(path.resolve(appDirectory, 'tsconfig.json'));
      const baseUrl = tsConfig?.compilerOptions?.baseUrl ?? '.';
      const pathAliases = tsConfig?.compilerOptions?.paths ?? {};

      return {
        ...config,
        plugins: [
          ...config.plugins,
          'babel-plugin-styled-components',
          [
            'babel-plugin-module-resolver',
            {
              root: [baseUrl],
              alias: Object.keys(pathAliases).reduce(
                (aliases, aliasKey) => ({
                  ...aliases,
                  [aliasKey.replace('/*', '')]: pathAliases[
                    aliasKey
                  ][0].replace('/*', '')
                }),
                {}
              )
            }
          ]
        ]
      };
    } catch (err) {
      console.error(err);
    }
  }
};
