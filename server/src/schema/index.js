const { gql } = require('apollo-server');

const employeeSchema = require('./employee');

const schema = gql`
  type Query {
    helloWorld: String!
  }
`;

module.exports = [ schema, employeeSchema ];
