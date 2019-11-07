class Employee {
  constructor() {
    this.employee = {
      firstName: 'Emmanuel',
      email: 'ezeemmanuel2010@gmail.com',
      password: 'adminPassword',
      jobRole: 'admin',
    };

    this.validEmployee = {
      email: 'ezeemmanuel2010@gmail.com',
      password: 'adminPassword',
    };

    this.invalidEmployee = {
      email: 'invaliduser@gmail.com',
      password: 'invalidpassword',
    };
  }
}

export default Employee;
