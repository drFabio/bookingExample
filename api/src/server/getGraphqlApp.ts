import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { Context } from '../types';
import { ApolloServer } from 'apollo-server';

export function getGraphqlApp(appContext: Context): ApolloServer {
  const context = () => appContext;
  const graphqlOptions = { typeDefs, resolvers, context };
  return new ApolloServer(graphqlOptions);
}
