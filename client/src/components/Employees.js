import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { request } from 'graphql-request';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import '../App.css';

import { LIST_EMPLOYEES } from '../graphql/queries';
import { CREATE_EMPLOYEE, UPDATE_EMPLOYEE, DELETE_EMPLOYEE } from '../graphql/mutations';

import Header from './Header';
import Modal from './Modal';
import Pagination from './Pagination';
import EmployeeForm from './EmployeeForm';

import SearchBox from './SearchBox';
import useDebounce from '../hooks/useDebouncedValue';

const GRAHPHQL_URL = 'http://localhost:3131/graphql';

function fetchEmployees({ queryKey }) {
  const [_, { page, debouncedQuery }] = queryKey;
  return request(
    GRAHPHQL_URL,
    LIST_EMPLOYEES, {
      page,
      filter: debouncedQuery,
    },
  );
}

function Employees() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [query, setQuery] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState({
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    mobile: '',
    department: '',
    job_profile: '',
    salary: '',
  });

  const debouncedQuery = useDebounce(query, 250);
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState('add')

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(
    ['employees', { page, debouncedQuery }],
    fetchEmployees
  );

  const addEmployeeMutation = useMutation(newEmployee => {
    return request(
      GRAHPHQL_URL,
      CREATE_EMPLOYEE, {
        employee: newEmployee,
      }
    );
  }, {
    onSettled: (data) => {
      queryClient.invalidateQueries('employees');
    }
  });

  const updateMutation = useMutation((variables) => {
    return request(
      GRAHPHQL_URL,
      UPDATE_EMPLOYEE,
      variables
    );
  }, {
    onSettled: (data) => {
      queryClient.invalidateQueries('employees', { page, query });
    }
  });

  const deleteMutation = useMutation((employeeId) => {
    return request(
      GRAHPHQL_URL,
      DELETE_EMPLOYEE,
      {
        employeeId,
      }
    );
  }, {
    onSettled: (data) => {
      queryClient.invalidateQueries('employees', { page, query });
    }
  });

  const onModalClose = () => {
    // reset();
    setMode('add');
    setShowModal(false);
  }

  const onSubmit = (data) => {
    if (mode === 'add') {
      addEmployeeMutation.mutate(data);
      setTimeout(() => {
        if (!addEmployeeMutation.isLoading) {
          onModalClose();
        }
      }, 2000);
    } else {
      updateMutation.mutate({ employeeId: selectedEmployee.id, employee: data });
      setTimeout(() => {
        if (!updateMutation.isLoading) {
          onModalClose();
        }
      }, 2000);
    }
  }

  const handleOnDelete = (employeeId) => {
    deleteMutation.mutate(employeeId);
  }

  return (
    <>
      <Header
        onAddEmployee={() => {
          setShowModal(true);
        }}
      />
      <div className="container mt-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <SearchBox
              name="query"
              placeholder="Search Employees..."
              value={query}
              onChange={(value) => setQuery(value)}
            />
            {debouncedQuery !== "" && (
              <div className="mt-4 d-flex justify-content-between align-items-center border-secondary border-top border-bottom p-2">
                <span>
                  Found <strong>{data.listEmployees.total}</strong> employees
                  matching {query}
                </span>
                <button
                  className="btn text-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    setQuery("");
                  }}
                >
                  <span>
                    <FontAwesomeIcon icon={faTimesCircle} />
                  </span>
                  clear filter
                </button>
              </div>
            )}
            <table className="table mt-4">
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
                {data.listEmployees.employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>
                      <div className="d-inline-flex align-items-center">
                        <div className="profile-image-container">
                          <img
                            src={employee.image_url}
                            alt={employee.first_name}
                          />
                        </div>
                        <h6 className="ml-2">{`${employee.first_name} ${employee.last_name}`}</h6>
                      </div>
                    </td>
                    <td>{employee.email}</td>
                    <td>{employee.mobile}</td>
                    <td>{employee.gender}</td>
                    <td>{employee.job_profile}</td>
                    <td>{employee.department}</td>
                    <td>&#8377; {employee.salary}</td>
                    <td>
                      <button className="btn btn-success btn-sm mr-1">
                        <FontAwesomeIcon
                          icon={faPen}
                          onClick={(e) => {
                            e.preventDefault();
                            setMode('edit');
                            setShowModal(true);
                            setSelectedEmployee(employee);
                          }}
                        />
                      </button>
                      <button className="btn btn-danger btn-sm ml-1">
                        <FontAwesomeIcon icon={faTrashAlt} onClick={(e) => {
                          e.preventDefault();
                          handleOnDelete(employee.id);
                        }} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              className="pagination-wrapper"
              currentPage={page}
              pageSize={pageSize}
              totalItems={data.listEmployees.total}
            >
              {({
                pages,
                previousPage,
                nextPage,
                hasPreviousPage,
                hasNextPage,
                totalPages,
              }) => (
                <ul className="pagination">
                  <li className="pagination-meta">
                    Page {page} of {totalPages}
                  </li>
                  {hasPreviousPage && (
                    <>
                      <li className="page-item pagination-first">
                        <button
                          className="page-link"
                          onClick={(e) => {
                            e.preventDefault();
                            setPage(1);
                          }}
                        >
                          First
                        </button>
                      </li>
                      <li className="page-item pagination-prev">
                        <button
                          className="page-link"
                          onClick={(e) => {
                            e.preventDefault();
                            setPage(previousPage);
                          }}
                        >
                          &#8592;&nbsp;Previous
                        </button>
                      </li>
                    </>
                  )}
                  {pages.map((p) => (
                    <li
                      key={p}
                      className={p === page ? "page-item active" : "page-item"}
                    >
                      <button
                        className="page-link"
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(p);
                        }}
                      >
                        {p}
                      </button>
                    </li>
                  ))}
                  {hasNextPage && (
                    <>
                      <li className="page-item pagination-first">
                        <button
                          className="page-link"
                          onClick={(e) => {
                            e.preventDefault();
                            setPage(nextPage);
                          }}
                        >
                          Next&nbsp;&#8594;
                        </button>
                      </li>
                      <li className="page-item pagination-prev">
                        <button
                          className="page-link"
                          onClick={(e) => {
                            e.preventDefault();
                            setPage(totalPages);
                          }}
                        >
                          Last
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              )}
            </Pagination>
          </>
        )}
        <Modal show={showModal}>
          <div className="modal-header">
            <h5 className="modal-title">
              {mode === "add"
                ? "Add Employee Details"
                : "Update Employee Details"}
            </h5>
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
            <EmployeeForm
              employee={selectedEmployee}
              onSubmit={onSubmit}
              mode={mode}
              loading={mode === 'add' ? addEmployeeMutation.isLoading : updateMutation.isLoading}
            />
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Employees
