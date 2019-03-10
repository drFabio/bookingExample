import { settings as defaultSettings } from './settings';
import * as types from './types';
import sqlite3 from 'sqlite3';
import { getLogger } from './logger';
import { getGraphqlApp, getRestApp } from './server';
import { BookingManager } from './managers';

async function setup(setting: types.Settings) {
  const logger = getLogger();
  const verbose = sqlite3.verbose();
  const db = new verbose.Database(setting.dbUri);
  const bookingManager = new BookingManager(db);
  logger.info(
    `Setting up system with port: ${setting.port} and graphqlPort: ${
      setting.graphqlPort
    }`
  );
  const appContext: types.Context = { bookingManager, logger };
  const context = () => appContext;
  const graphqlServer = getGraphqlApp(appContext);
  const { url } = await graphqlServer.listen({ port: setting.graphqlPort });
  logger.info(`Apollo server is listening at ${url}`);
  const app = getRestApp(appContext);
  await app.listen(setting.port);
  logger.info(`Rest server is listening at port ${setting.port}`);
}
setup(defaultSettings);
