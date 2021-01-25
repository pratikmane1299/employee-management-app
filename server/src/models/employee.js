const { Model } = require('objection');

class Employee extends Model {
  static get tableName() {
    return 'employee';
  }
}

module.exports = Employee;
