const { gql } = require('apollo-server');

const employeeSchema = gql`
  extend type Query {
    listEmployees: [Employee!]!
  }

  extend type Mutation {
    createEmployee(employee: EmployeeInput): Employee 
    updateEmployee(employeeId: ID!, employee: EmployeeInput): Employee
  }

  input EmployeeInput {
    first_name: String!
    last_name: String!
    email: String!
    mobile: String!
    gender: Gender
    image_url: String
    department: String!
    job_profile: String!
    salary: Float!
  }

  enum Gender {
    MALE
    FEMALE
  }

  type Employee {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    mobile: String!
    gender: String!
    image_url: String
    department: String!
    job_profile: String!
    salary: Float!
  }
`;

module.exports = employeeSchema;
