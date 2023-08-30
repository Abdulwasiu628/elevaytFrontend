/* eslint-disable no-unused-vars */

import {
  override,
  addWebpackModuleRule,
  addWebpackPlugin,
} from "customize-cra";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

export default override((config) => {
  // Set production mode for tree shaking
  config.mode = "production";
  addWebpackPlugin(new BundleAnalyzerPlugin());

  // Enable tree shaking
  config.optimization.usedExports = true;
  return config;
});
