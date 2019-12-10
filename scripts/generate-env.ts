import fs from "fs";
import path from "path";

const gatewayEnvironmentVariables = `SERVER_PORT=4000
SERVER_ADDRESS=::
USER_SERVICE_URL=http://localhost:4002/graphql
LEARNING_SERVICE_URL=http://localhost:4001/graphql
LOG_LEVEL=debug
`;

const userEnvironmentVariables = `SERVER_PORT=4002
SERVER_ADDRESS=::
LOG_LEVEL=debug
`;


const learningEnvironmentVariables = `SERVER_PORT=4001
SERVER_ADDRESS=::
LOG_LEVEL=debug
LEARN_API_URL=https://connect.unity.com/api/learn
`;

function generateEnvironments(serviceEnvPath: string, envData: string) {
  fs.writeFileSync(path.resolve(__dirname, serviceEnvPath), envData);
}


generateEnvironments("../services/gateway/.env", gatewayEnvironmentVariables)
generateEnvironments("../services/user/.env", userEnvironmentVariables)
generateEnvironments("../services/learning/.env", learningEnvironmentVariables);
