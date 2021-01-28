import { gql } from '@apollo/client';

export const LIST_EMPLOYEES = gql`
  {
    listEmployees {
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
