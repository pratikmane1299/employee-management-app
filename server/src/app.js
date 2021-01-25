require('dotenv').config()
const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const port = process.env.PORT || 3131;

const app = express();

const graphqlServer = new ApolloServer({
  typeDefs,
  resolvers,
});

graphqlServer.applyMiddleware({ app });

app.listen(port, () =>
  console.log(`graphql server running on http://localhost:${port}${graphqlServer.graphqlPath}`)
);
