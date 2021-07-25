import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Input from './Input';
import Radio from './Radio';
import Select from './Select';

import { departments, jobTitles } from '../constants';

const schema = yup.object().shape({
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  email: yup.string().email().required("Email is required"),
  mobile: yup
    .string()
    .matches(/^[6-9]\d{9}$/, {
      message: "Not a valid number",
      excludeEmptyString: true,
    })
    .required("Mobile is required"),
  image_url: yup.string().url("Not a valid url"),
  gender: yup.string().required("Gender is required").uppercase(),
  department: yup.string().required("Department is required"),
  job_profile: yup.string().required("Job profile is required"),
  salary: yup.number().positive().required("Salary is required"),
});

function EmployeeForm({ mode, onSubmit, loading, employee }) {
  const { register, handleSubmit, errors, } = useForm({
    resolver: yupResolver(schema),
    defaultValues: employee || {}
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col">
          <Input
            name="first_name"
            label="First Name"
            type="text"
            placeholder="Enter first name"
            register={register}
            error={errors.first_name}
          />
        </div>
        <div className="col">
          <Input
            name="last_name"
            label="Last Name"
            type="text"
            placeholder="Enter last name"
            register={register}
            error={errors.last_name}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Input
            name="email"
            label="Email"
            type="email"
            placeholder="Enter email"
            register={register}
            error={errors.email}
          />
        </div>
        <div className="col">
          <Input
            name="mobile"
            label="Mobile"
            type="text"
            placeholder="Enter mobile"
            register={register}
            error={errors.mobile}
          />
          <small className="form-text text-muted">
            Mobile number must start with 7-9 and must be of length 10.
          </small>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Input
            name="image_url"
            label="Image Url"
            type="text"
            placeholder="Enter image url"
            register={register}
            error={errors.image_url}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label className="d-block">Gender</label>
            <Radio
              name="gender"
              label="Gender"
              value="male"
              register={register}
            />
            <Radio
              name="gender"
              label="Gender"
              value="female"
              register={register}
            />
            <div className="text-danger">
              <small>{errors.gender?.message}</small>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Select
            name="department"
            label="Department"
            options={departments}
            register={register}
            error={errors.department}
          />
        </div>
        <div className="col">
          <Select
            name="job_profile"
            label="Job Title"
            options={jobTitles}
            register={register}
            error={errors.job_profile}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Input
            name="salary"
            label="Salary"
            type="number"
            placeholder="Enter salary"
            register={register}
            error={errors.salary}
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        {loading ? '...' : mode === 'add' ? 'Add Employee' : 'Update Employee'}
      </button>
    </form>
  );
}

export default EmployeeForm;
