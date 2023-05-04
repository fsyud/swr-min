import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

// 一段自定义的内容，以下内容会添加到打包结果中
const footer = `
if(typeof window !== 'undefined') {
  window._Ho_HOOKS_VERSION_ = '${pkg.version}'
}`;

export default {
  input: "src/main.ts",
  output: [
    {
      name: "use_swr",
      file: pkg.main,
      format: "umd",
      sourcemap: true,
      footer,
    },
  ],
  plugins: [typescript(), clear({ targets: ["dist"] })],
};
