const path = require("path");
const packageJson = require("./package.json");
const { getPaths, edit, editWebpackPlugin } = require("@rescripts/utilities");

const isResolve = (inQuestion) =>
  inQuestion && inQuestion.alias && inQuestion.modules && inQuestion.extensions;
const isBabelLoader = (inQuestion) =>
  inQuestion && inQuestion.loader && inQuestion.loader.includes("babel-loader");

module.exports = {
  webpack: (config) => {
    const args = process.argv.slice(2);
    const startWithComponents = args.includes("--components");

    config.optimization.runtimeChunk = false;
    config.optimization.splitChunks = {
      cacheGroups: {
        default: false,
      },
    };
    config.output.globalObject = "window";
    // TODO: read this from package.json
    config.output.library = packageJson.name.replace("@pie/", "");
    // TODO: Change this to module when using webpack 5
    config.output.libraryTarget = "window";
    config.externals = {
      react: "React",
      ["react-dom"]: "ReactDOM",
      ["react-redux"]: "ReactRedux",
    };

    if (process.env.NODE_ENV === "development") {
      if (startWithComponents) {
        const componentsPath = path.resolve("../Components/src");
        const pieCrustPath = path.resolve("../PieCrust");
        // edit plugins
        editWebpackPlugin(
          (p) => (p.tsconfig = path.resolve("./tsconfig.components.json")),
          "ForkTsCheckerWebpackPlugin",
          config
        );

        // edit babel loader
        edit(
          (babelLoader) => {
            if (babelLoader.include) {
              babelLoader.include = [babelLoader.include, componentsPath];
            }
            return babelLoader;
          },
          getPaths(isBabelLoader, config),
          config
        );

        // edit resolve
        edit(
          (resolveObject) => {
            if (
              resolveObject.alias &&
              typeof resolveObject.alias === "object"
            ) {
              // edit ModuleScopePlugin
              editWebpackPlugin(
                (p) => (p.appSrcs = [...p.appSrcs, componentsPath]),
                "ModuleScopePlugin",
                resolveObject
              );
              resolveObject.alias["@material-ui/core"] = path.resolve(
                "./node_modules/@material-ui/core"
              );
              resolveObject.alias["@material-ui/styles"] = path.resolve(
                "./node_modules/@material-ui/styles"
              );
              resolveObject.alias["@pie/components"] = componentsPath;
            }
            return resolveObject;
          },
          getPaths(isResolve, config),
          config
        );
      }
    }
    return config;
  },
};
