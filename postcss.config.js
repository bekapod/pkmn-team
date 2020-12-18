/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  plugins: {
    'postcss-nesting': {},
    'postcss-custom-media': { importFrom: './src/styles/globals.css' },
    autoprefixer: {}
  }
};
