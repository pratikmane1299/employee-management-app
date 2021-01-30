import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import './App.css';

import Header from './components/Header';
import Modal from './components/Modal';
import Input from './components/Input';
import Radio from './components/Radio';
import Select from './components/Select';

import { LIST_EMPLOYEES } from './graphql/queries';
import { CREATE_EMPLOYEE } from './graphql/mutations';

import { departments, jobTitles } from './constants';

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

function App() {
  const { loading, data } = useQuery(LIST_EMPLOYEES);
  const [createEmployee] = useMutation(CREATE_EMPLOYEE, { 
    update(cache, {data: { createEmployee: newEmployee }}) {
      const { listEmployees } = cache.readQuery({ query: LIST_EMPLOYEES });

      cache.writeQuery({
        query: LIST_EMPLOYEES,
        data: { listEmployees: [...listEmployees, newEmployee] },
      });
    }
  });
  
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema)
  });
  const [showModal, setShowModal] = useState(false);

  const onSubmit = async (data) => {
    await createEmployee({ variables: { employee: data } });
    setShowModal(false);
  };

  const onModalClose = () => {
    reset();
    setShowModal(false);
  }

  return (
    <>
      <Header onAddEmployee={() => setShowModal(true)} />
      <div className="container mt-4">
        {loading ? (
          <p>loading...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Gender</th>
                <th>Profile</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.listEmployees.map(
                ({
                  id,
                  first_name,
                  last_name,
                  email,
                  image_url,
                  gender,
                  mobile,
                  department,
                  job_profile,
                  salary,
                }) => (
                  <tr key={id}>
                    <td>
                      <div className="d-inline-flex align-items-center">
                        <div className="profile-image-container">
                          <img src={image_url} alt={first_name} />
                        </div>
                        <h6 className="ml-2">{`${first_name} ${last_name}`}</h6>
                      </div>
                    </td>
                    <td>{email}</td>
                    <td>{mobile}</td>
                    <td>{gender}</td>
                    <td>{job_profile}</td>
                    <td>{department}</td>
                    <td>&#8377; {salary}</td>
                    <td>
                      <button className="btn btn-success btn-sm mr-1">
                        <FontAwesomeIcon icon={faPen} />
                      </button>
                      <button className="btn btn-danger btn-sm ml-1">
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
        <Modal show={showModal}>
          <div className="modal-header">
            <h5 className="modal-title">Add Employee Details</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={onModalClose}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
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
                Add Employee
              </button>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default App;
