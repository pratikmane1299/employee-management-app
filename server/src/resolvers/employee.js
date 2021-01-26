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
    },
    updateEmployee: async (_, { employeeId, employee }, { Employee }) => {
      const updatedEmployee = await Employee.query()
        .patch(employee)
        .findById(employeeId)
        .returning('*');
      return updatedEmployee;
    }
  }
}

module.exports = employeeResolver;
