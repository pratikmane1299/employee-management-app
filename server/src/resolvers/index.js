const resolvers = {
  Gender: {
    MALE: 'male',
    FEMALE: 'female',
  },
  Query: {
    helloWorld: (_, __, ___) => {
      return 'Hello World !!!';
    }
  }
}

module.exports = resolvers;
