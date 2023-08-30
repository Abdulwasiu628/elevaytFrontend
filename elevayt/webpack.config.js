import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import { resolve as _resolve } from "path";

export const resolve = {
  alias: {
    "@components": _resolve(__dirname, "src/components"),
    "@slicers": _resolve(__dirname, "src/redux/slicers"),
    "@static": _resolve(__dirname, "src/static"),
    "@store": _resolve(__dirname, "src/redux/store"),
    "@styles": _resolve(__dirname, "src/styles"),
    "@data": _resolve(__dirname, "src/data"),
  },
};
export const module = {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            "@babel/preset-react",
            "@babel/plugin-proposal-private-property-in-object",
          ],
        },
      },
    },
    {
      // Apply source-map-loader to JavaScript files except react-image
      test: /\.js$/,
      enforce: "pre",
      exclude: /node_modules\/(?!react-image)/,
      use: ["source-map-loader"],
    },
    // ... other rules
  ],
};
export const optimization = {
  minimize: true,
  minimizer: [new CssMinimizerPlugin()],
  splitChunks: {
    chunks: "all",
  },
};
