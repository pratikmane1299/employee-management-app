const employeeResolver = {
  Gender: {
    MALE: 'male',
    FEMALE: 'female',
  },
  Query: {
    listEmployees: async (_, args, { Employee }) => {
      return await Employee.query()
        .select('*');
    }
  }
}

module.exports = employeeResolver;
