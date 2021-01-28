import { useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import './App.css';

import Header from './components/Header';

import { LIST_EMPLOYEES } from './graphql/queries';

function App() {
  const { loading, data } = useQuery(LIST_EMPLOYEES);

  return (
    <>
      <Header />
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
      </div>
    </>
  );
}

export default App;
