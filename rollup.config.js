import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
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
