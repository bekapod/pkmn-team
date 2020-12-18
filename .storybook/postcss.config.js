module.exports = {
  plugins: [
    require('postcss-nesting'),
    require('postcss-flexbugs-fixes'),
    require('postcss-custom-media')({ importFrom: './src/styles/globals.css' }),
    require('postcss-preset-env')({
      autoprefixer: {
        flexbox: 'no-2009'
      },
      stage: 3,
      features: {
        'custom-properties': false
      }
    })
  ]
};
