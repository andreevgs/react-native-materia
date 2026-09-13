const { getDefaultConfig } = require("expo/metro-config");
const { withMetroConfig } = require("react-native-monorepo-config");
const path = require("path");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "..");

const config = getDefaultConfig(projectRoot);

config.transformer.babelTransformerPath =
  require.resolve("./md-transformer.js");
config.resolver.sourceExts.push("md");

module.exports = withMetroConfig(config, {
  dirname: projectRoot,
  root: workspaceRoot,
});
