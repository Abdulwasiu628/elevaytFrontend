// webpack.config.js
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

export const optimization = {
  minimize: true,
  minimizer: [new CssMinimizerPlugin()],
  module: {
    rules: [
      // ... other rules
      {
        // Apply source-map-loader to JavaScript files except react-image
        test: /\.js$/,
        enforce: "pre",
        exclude: /node_modules\/(?!react-image)/,
        use: ["source-map-loader"],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
