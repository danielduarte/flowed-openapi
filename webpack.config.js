const path = require('path');

module.exports = {
  mode: "production",
  entry: './dist/index.js',
  output: {
    filename: 'flowed-openapi.js',
    path: path.resolve(__dirname, 'web'),
    library: "FlowedOpenApi",
  },
  resolve: {
    fallback: {
      fs: false,
    },
  }
};
