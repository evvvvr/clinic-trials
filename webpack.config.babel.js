export default {
  output: {
    filename: 'client-bundle.js',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
      },
      { test: /\.json$/, loader: 'json-loader' },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};
