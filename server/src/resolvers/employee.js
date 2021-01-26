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
  },
  Mutation: {
    createEmployee: async (_, { employee }, { Employee }) => {
      const newEmployee = await Employee.query()
        .insert(employee);

      return newEmployee;
    }
  }
}

module.exports = employeeResolver;
