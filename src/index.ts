import { ApolloServer } from 'apollo-server';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import { createContext } from './context';

new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
  playground: true,
  introspection: true,

}).listen(
  { port: process.env.PORT || 8080 },
  () => console.info(`GraphQL server is running ${process.env.PORT || 8080}`),
).catch((err) => {
  console.error('Failing to start server: ', err);
});

