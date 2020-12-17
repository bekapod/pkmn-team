/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  plugins: [
    require('postcss-nesting'),
    require('postcss-custom-media')({ importFrom: './src/styles/globals.css' }),
    require('autoprefixer')
  ]
};
