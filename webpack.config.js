const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");


const config = {
  entry: {
    app: './assets/js/index.js',
    idb: './assets/js/idb.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/dist'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name (file) {
              return '[path][name].[ext]'
            },
            publicPath: function(url) {
                return url.replace('../', '/assets/')
            },
          }  
        }, 
        {
          loader: 'image-webpack-loader',
        },
      ],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static"
    }),
    new WebpackPwaManifest({
      name: "Budget Tracker",
      short_name: "Budget",
      description: "An app that allows you to budget online or offline.",
      start_url: "../index.html",
      background_color: "#01579b",
      theme_color: "#ffffff",
      fingerprints: false,
      inject: false,
      icons: [{
        src: path.resolve("assets/img/icons/icon-512x512.png"),
        sizes: [96, 128, 192, 256, 384, 512],
        destination: path.join("assets", "icons")
      }]
    })
],
  mode: "development"
};

module.exports = config;
