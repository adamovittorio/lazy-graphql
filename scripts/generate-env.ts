import fs from "fs";
import path from "path";

const gatewayEnvironmentVariables = `
SERVER_PORT=4000
SERVER_ADDRESS=::
USER_SERVICE_URL=http://localhost:4002/graphql
VIDEOGAME_SERVICE_URL=http://localhost:4001/graphql
`;

const userEnvironmentVariables = `
SERVER_PORT=4002
SERVER_ADDRESS=::
`;


const videogameEnvironmentVariables = `
SERVER_PORT=4001
SERVER_ADDRESS=::
`;

function generateEnvironments(serviceEnvPath: string, envData: string) {
  fs.writeFileSync(path.resolve(__dirname, serviceEnvPath), envData);
}


generateEnvironments("../services/gateway/.env", gatewayEnvironmentVariables)
generateEnvironments("../services/user/.env", userEnvironmentVariables)
generateEnvironments("../services/videogame/.env", videogameEnvironmentVariables)