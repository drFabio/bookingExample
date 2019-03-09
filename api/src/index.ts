import { ApolloServer } from 'apollo-server';
import express from 'express';
import bodyParser from 'body-parser';
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
  const graphqlOptions = { typeDefs, resolvers };
  const server = new ApolloServer(graphqlOptions);
  const { url } = await server.listen({ port: setting.graphqlPort });
  logger.info(`Apollo server is listening at ${url}`);
  const app = express();
  app.use(bodyParser.json());
  app.get('/bookings', (req, res) => res.json(resolvers.Query.bookings()));
  app.get('/users/:userId/bookings', (req, res) => res.json([]));
  await app.listen(setting.port);
  logger.info(`Rest server is listening at port ${setting.port}`);
}
setup(defaultSettings);
