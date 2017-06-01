module.exports = {
  entry: './index.jsx',
  output: {
    filename: 'bundle.js',
    path: __dirname,
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
      },
    ],
  },
};
