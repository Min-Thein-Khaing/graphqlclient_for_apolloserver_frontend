import { CodegenConfig } from "@graphql-codegen/cli";


const config: CodegenConfig = {
  schema: "http://localhost:4000",
  documents: ["src/**/*.tsx", "src/**/*.ts"],
  generates: {
    "./src/__generate__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql"
      }
    },
    "./src/__generate__/types.ts": {
      plugins: ["typescript", "typescript-operations"]
    }
  },
  // ignoreNoDocuments: true
};

export default config;
