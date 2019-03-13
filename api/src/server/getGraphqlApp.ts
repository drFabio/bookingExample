import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { Context } from '../types';
import { ApolloServer, makeExecutableSchema } from 'apollo-server';

export function getGraphqlApp(appContext: Context): ApolloServer {
  const context = () => appContext;
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    resolverValidationOptions: { requireResolversForResolveType: false }
  });
  const graphqlOptions = { schema, context };
  return new ApolloServer(graphqlOptions);
}
