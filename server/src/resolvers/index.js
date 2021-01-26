const employeeResolver = require('./employee');

const resolvers = {
  Query: {
    helloWorld: (_, __, ___) => {
      return 'Hello World !!!';
    }
  }
}

module.exports = [ resolvers, employeeResolver ];
