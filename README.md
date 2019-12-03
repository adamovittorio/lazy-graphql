# Lazy Graphql

- [Development](#Development)
- [Environment](#ArchitectureOverview)
- [Architecture Overview](#ArchitectureOverview)

## Development

1. Use the version of node specified in `.nvmrc` example: `nvm use v12.13.1`.
2. Install dependencies and compile Typescript with `npm install`.
3. To generate a valid .env for the local projects you can run `npm run generate:local-env`
4. Start services in development mode with `npm run start:services`.
5. Start gateway in development mode with `npm run start:gateway`.
6. Attach debugger to all the services with `Lazy Graphql` in the debug tasks.
7. Have Fun! 🏄‍♂️

## Environment

This project use environment variables to configure the behaviour of the services.
For local development you can generate a valid `.env` for all the sub-projects by running `npm run generate:local-env`.

For a brief descriptions of the required environment variables, you can find the Interface Definition in `service/src/lib/configuration`:

## Architecture Overview

![alt text](lazygraphql.png)
