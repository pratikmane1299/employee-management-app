import { gql } from '@apollo/client';

export const LIST_EMPLOYEES = gql`
  query ListEmployees($page: Int, $pageSize: Int, $filter: String) {
    listEmployees(page: $page, pageSize: $pageSize, filter: $filter) 
    @connection(key: "employees", filter: ["filter"]) {
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
