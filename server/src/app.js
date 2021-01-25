require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const knex = require("./db");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

async function main() {
  const port = process.env.PORT || 3131;
  const app = express();

  const graphqlServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await knex.migrate.latest();

  await knex.seed.run();

  graphqlServer.applyMiddleware({ app });

  app.listen(port, () =>
    console.log(
      `graphql server running on http://localhost:${port}${graphqlServer.graphqlPath}`
    )
  );
}

main();
