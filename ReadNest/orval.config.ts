export default {
  api: {
    input: "./src/api/openapi.json",
    output: {
      mode: "tags-split",
      target: "./src/api/generated/api.ts",
      schemas: "./src/api/generated/model",
      client: "axios",
      override: {
        mutator: {
          path: "./src/api/axiosClient.ts",
          name: "customAxios",
        },
      },
    },
  },
};
