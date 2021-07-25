import { gql } from 'graphql-request';

export const LIST_EMPLOYEES = gql`
  query ListEmployees($page: Int, $filter: String) {
    listEmployees(page: $page, filter: $filter) {
      employees {
        id
        first_name
        last_name
        image_url
        email
        mobile
        gender
        job_profile
        department
        salary
      }
      total
    }
  }
`;

export const GET_EMPLOYEE = gql`
  query GetEmployee($employeeId: ID!) {
    getEmployee(employeeId: $employeeId) {
      id
      first_name
      last_name
      image_url
      email
      mobile
      gender
      job_profile
      department
      salary
    }
  }
`;
