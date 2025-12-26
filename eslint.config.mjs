import next from "eslint-config-next";

const config = [
  ...next,
  {
    ignores: ["node_modules/**", ".next/**", "public/**"]
  },
  {
    rules: {
      "@next/next/no-img-element": "off"
    }
  }
];

export default config;
