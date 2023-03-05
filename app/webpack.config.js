const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: process.env.MODE,
  devtool: "eval-cheap-source-map",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].[hash].js"
  },
  devServer: {
    port: process.env.DEV_PORT,
    historyApiFallback: true
  },
  plugins: [
    new HTMLWebpackPlugin({ template: "./public/index.html" }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin(
      {
        "process.env.MODE": JSON.stringify(process.env.MODE)
      }
    )
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      "@public": path.resolve(__dirname, "public"),
      "@http": path.resolve(__dirname, "src", "http"),
      "@redux": path.resolve(__dirname, "src", "redux"),
      "@hooks": path.resolve(__dirname, "src", "hooks"),
      "@services": path.resolve(__dirname, "src", "services"),
      "@pages": path.resolve(__dirname, "src", "pages"),
      "@modals": path.resolve(__dirname, "src", "modals"),
      "@components": path.resolve(__dirname, "src", "components"),
      "@entities": path.resolve(__dirname, "src", "entities"),
      "@helpers": path.resolve(__dirname, "src", "helpers")
    }
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: { localIdentName: "[local]--[hash:base64:5]",  }
            }
          },
          "sass-loader"]
      },
      {
        test: /\.(jpg|jpeg|png|svg)$/,
        use: ["file-loader"]
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node_modules/'
      }
    ],
  }
}