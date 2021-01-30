import { gql } from '@apollo/client';

export const CREATE_EMPLOYEE = gql`
  mutation CreateNewEmployee($employee: EmployeeInput) {
    createEmployee(employee: $employee) {
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
