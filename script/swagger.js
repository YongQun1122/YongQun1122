const { codegen } = require("swagger-axios-codegen");
require("dotenv").config();
if (!process.env.API_SCHEMA_PATH) throw new Error(`"API_SCHEMA_PATH" is not defined. Please set "API_SCHEMA_PATH" value in env file.`);
codegen({
  methodNameMode: "operationId",
  remoteUrl: process.env.API_SCHEMA_PATH,
  outputDir: "src/api",
  include: ["CustomerAuthentication"]
});
