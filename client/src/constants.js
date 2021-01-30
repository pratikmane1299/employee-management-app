import * as yup from 'yup';

export const departments = ['IT', 'HR', 'Sales', 'Accounts', 'Software'];

export const jobTitles = [
  'HR Manager',
  'Sales Person',
  'Junior Accountant',
  'Network Admin',
  'React Developer',
  'Tech Lead',
];

export const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required(),
  email: yup.string().email().length(10).required(),
  mobile: yup.number().required(),
  gender: yup.string().required(),
  department: yup.string().required(),
  jobTitle: yup.string().required(),
  salary: yup.number().positive().required(),
});
