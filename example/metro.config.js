const { getDefaultConfig } = require("expo/metro-config");
const { withMetroConfig } = require("react-native-monorepo-config");
const path = require("path");
const { pathToFileURL } = require("url");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "..");

const config = getDefaultConfig(projectRoot);

module.exports = withMetroConfig(config, {
  dirname: projectRoot,
  root: workspaceRoot,
});
