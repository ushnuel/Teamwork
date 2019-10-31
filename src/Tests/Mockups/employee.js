class Employee {
  constructor() {
    this.employee = {
      firstName: 'Emmanuel',
      lastName: 'Chinazom',
      email: 'ezeemmanuel2010@gmail.com',
      password: 'adminPassword',
      jobRole: 'Admin',
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
  }
}

export default Employee;
