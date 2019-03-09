import * as types from './types';

export const settings: types.Settings = {
  port: Number(process.env.REST_PORT || 4000),
  graphqlPort: Number(process.env.GRAPHQL_PORT || 5000)
};
