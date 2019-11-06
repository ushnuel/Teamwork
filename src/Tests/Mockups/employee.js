class Employee {
  constructor() {
    this.employee = {
      firstName: 'Emmanuel',
      lastName: 'Chinazom',
      email: 'ezeemmanuel2010@gmail.com',
      password: 'adminPassword',
      jobRole: 'admin@20_@',
      gender: 'Male',
      department: 'Management',
      address: 'Lambe street, Lagos',
    };

    this.validEmployee = {
      email: 'ezeemmanuel2010@gmail.com',
      password: 'adminPassword',
    };

    this.invalidEmployee = {
      email: 'invaliduser@gmail.com',
      password: 'invalidpassword',
    };

    this.notAdmin = {
      firstName: 'Chinazom',
      email: 'notAdmin@gmail.com',
      password: 'notadmin',
      jobRole: 'Engineer',
    };
  }
}

export default Employee;
