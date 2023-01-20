import typescript from "@rollup/plugin-typescript";
const config = [
  {
    input: "dist/index.js",
    output: {
      file: "dist/index.cjs",
      format: "cjs",
      sourcemap: true,
    },
    external: ["fs", "os", "path", "child_process"],
    plugins: [typescript()],
  }
];
export default config;
