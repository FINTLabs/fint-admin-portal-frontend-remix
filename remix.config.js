// /** @type {import('@remix-run/dev').AppConfig} */
// export default {
//   ignoredRouteFiles: ["**/.*"],
//   // appDirectory: "app",
//   // assetsBuildDirectory: "public/build",
//   // publicPath: "/build/",
//   // serverBuildPath: "build/index.js",
// };
/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  future: {
    v2_meta: true,
    v2_routeConvention: true,
    v2_errorBoundary: true,
    v2_headers: true,
  },
  ignoredRouteFiles: ["**/.*,", "**/*.css"],
  serverModuleFormat: "cjs",
  publicPath: "/rapportering/build/",
};

