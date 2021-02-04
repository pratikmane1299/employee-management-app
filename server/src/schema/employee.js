const { gql } = require('apollo-server');

const employeeSchema = gql`
  extend type Query {
    listEmployees(page: Int, pageSize: Int): ListEmployees!
    getEmployee(employeeId: ID!): Employee!
  }

  extend type Mutation {
    createEmployee(employee: EmployeeInput): Employee 
    updateEmployee(employeeId: ID!, employee: EmployeeInput): Employee
    deleteEmployee(employeeId: ID!): Employee
  }

  type ListEmployees {
    employees: [Employee!]!
    total: Int!
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
