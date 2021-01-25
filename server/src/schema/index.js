const { gql } = require('apollo-server');

const schema = gql`
  type Query {
    helloWorld: String!
  }
`;

module.exports = schema;
