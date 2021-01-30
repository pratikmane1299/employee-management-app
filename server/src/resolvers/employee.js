const employeeResolver = {
  Gender: {
    MALE: 'male',
    FEMALE: 'female',
  },
  Query: {
    listEmployees: async (_, args, { Employee }) => {
      return await Employee.query()
        .select('*');
    },
    getEmployee: async (_, { employeeId }, { Employee }) => {
      return await Employee.query()
        .select('*')
        .findById(employeeId);
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
    },
    deleteEmployee: async (_, { employeeId }, { Employee }) => {
      const deletedEmployee = await Employee.query()
        .deleteById(employeeId)
        .returning('*');

      return deletedEmployee;
    }
  }
}

module.exports = employeeResolver;
