const path = require("path");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: ["@babel/polyfill", "./assets/js/main.js"],
  output: {
    path: path.resolve(__dirname, "static"),
    filename: "js/main.js"
  },
  plugins: [new MiniCssExtractPlugin({ filename: "styles/styles.css" })],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins() {
                return [autoprefixer()];
              }
            }
          },
          "sass-loader"
        ]
      }
    ]
  }
};
