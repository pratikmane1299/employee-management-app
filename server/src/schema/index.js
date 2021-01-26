const { gql } = require('apollo-server');

const employeeSchema = require('./employee');

const schema = gql`
  type Query {
    helloWorld: String!
  }

  type Mutation {
    _: Boolean
  }
`;

module.exports = [ schema, employeeSchema ];
