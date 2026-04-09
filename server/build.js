require("esbuild").build({
  entryPoints: ["index.js"],
  bundle: true,
  platform: "node",
  target: "node18",
  outfile: "dist/app.js",
}).catch(() => process.exit(1));