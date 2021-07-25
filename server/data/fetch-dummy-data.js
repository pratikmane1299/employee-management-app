const fs = require('fs/promises');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const departments = ['IT', 'HR', 'Sales', 'Accounts', 'Software'];

const jobTitles = [
  'Network Admin',
  'HR Manager',
  'Sales Person',
  'Junior Accountant',
  'React Developer',
  'Tech Lead',
];

const jobMap = {
  IT: 'Network Admin',
  HR: 'HR Manager',
  Sales: 'Sales Person',
  Accounts: 'Junior Accountant',
  Software: 'React Developer',
  Software: 'Tech Lead',
};

function getRandomDepartment() {
  const index = Math.floor(Math.random() * departments.length)
  return departments[index];
}

function createEmployee(person) {
  const department = getRandomDepartment();

  return {
    id: uuidv4(),
    first_name: person.firstname,
    last_name: person.lastname,
    email: person.email,
    gender: person.gender,
    mobile: person.phone.slice(1, 11),
    image_url: person.image,
    department,
    job_profile: jobMap[department],
    salary: Number(person.phone.slice(4, 11)),
  }
}

async function fetchDummyData() {
  try {
    console.log('--------------- Fetching Employess ---------------');
    const { data } = await axios.get(
      `https://fakerapi.it/api/v1/persons?_quantity=100`
    );
    const employees = data.data.map(person => createEmployee(person)).slice(0, 10);

    await fs.writeFile('./employees.json', JSON.stringify(employees), 'utf-8');

    console.log('Employees fetched ...');

  } catch(error) {
    console.error(error);
  }
}

fetchDummyData();
