import { ApolloServer } from 'apollo-server';
import { settings as defaultSettings } from './settings';
import * as types from './types';
import { getLogger } from './logger';
import { typeDefs, resolvers } from './server';

async function setup(setting: types.Settings) {
  const logger = getLogger();
  logger.info(
    `Setting up system with port: ${setting.port} and graphqlPort: ${
      setting.graphqlPort
    }`
  );

  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await server.listen({ port: setting.graphqlPort });
  logger.info(`Apollo server is listening at ${url}`);
}
setup(defaultSettings);
