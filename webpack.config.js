const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const pages = [
  'index',
  'about'
]

module.exports = {
  mode: 'production',
  performance: {
    hints: process.env.NODE_ENV === 'production' ? "warning" : false
  },
  entry: pages.reduce((config, page) => {
    config[page] = `./src/${page}.js`;
    return config;
  }, {}),
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: './src/assets',
          to: './assets'
        }
      ],
    }),
  ].concat(
    pages.map(page =>
        new HtmlWebpackPlugin({
          inject: true,
          filename: `${page}.html`,
          chunks: [page],
        })
    )
  ),
  devServer: {
    static: './dist',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "src"),
      Styles: path.resolve(__dirname, "styles")
    }
  }
};
