import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const startServer = async () => {
  const app: Application = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app });

  // Conecta a MongoDB
  await mongoose.connect('mongodb://mongo:27017/userdb');

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
