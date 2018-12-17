axios.defaults.headers.common['X-CSRFToken'] = Cookies.get('csrftoken');
axios.defaults.headers.post['Content-Type'] = 'application/json';

new Vue({
  el: '#content',
  delimiters: ['${', '}'],
  data: {
    departments: [],
    jobTitles: [],
    employees: [],
    newEmployee: {
      first_name: '',
      last_name: '',
      department: '',
      job_title: '',
      join_date: '',
    },
    selectedEmployee: {
      id: '',
      first_name: '',
      last_name: '',
      department: '',
      job_title: '',
      join_date: '',
      left_date: '',
    },
    selectedEmployeeExtraInfo: {
      department_name: '',
      job_title_name: '',
    },
    keyword: '',
  },
  mounted: function() {
    this.getDepartments();
    this.getJobTitles();
    this.newEmployee.join_date = this.getToday();
  },
  methods: {
    getDepartments: function() {
      axios.get('/api/department/')
        .then((response) => {
          this.departments = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getJobTitles: function() {
      axios.get('/api/job-title/')
        .then((response) => {
          this.jobTitles = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    searchEmployees: function() {
      axios.get(`/api/employee/?search=${this.keyword}`)
        .then((response) => {
          this.employees = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getSelectedEmployee: function(employee_id) {
      axios.get(`/api/employee/${employee_id}/`)
        .then((response) => {
          const data = response.data;
          this.selectedEmployee = {
            id: data.id,
            first_name: data.first_name,
            last_name: data.last_name,
            department: data.department.id,
            job_title: data.job_title.id,
            join_date: data.join_date,
            left_date: data.left_date,
          };
          this.selectedEmployeeExtraInfo = {
            department_name: data.department.name,
            job_title_name: data.job_title.name,
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    saveEmployeeInfo: function() {
      axios.put(`/api/employee/${this.selectedEmployee.id}/`, this.selectedEmployee)
        .then((response) => {
          $('#employeeDetailsModal').modal('toggle');
          this.searchEmployees();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteEmployeeInfo: function() {
      axios.delete(`/api/employee/${this.selectedEmployee.id}/`)
        .then((response) => {
            $('#deleteConfirmationModal').modal('toggle');
            this.searchEmployees();
          })
          .catch((error) => {
            console.log(error);
          });
    },
    addNewEmployee: function() {
      axios.post('/api/employee/', this.newEmployee)
        .then((response) => {
          $('#addEmployeeModal').modal('toggle');
          this.newEmployee = {
            first_name: '',
            last_name: '',
            department: '',
            job_title: '',
            join_date: '',
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getToday: function () {
      const toTwoDigits = num => num < 10 ? '0' + num : num;
      let today = new Date();
      let year = today.getFullYear();
      let month = toTwoDigits(today.getMonth() + 1);
      let day = toTwoDigits(today.getDate());
      return `${year}-${month}-${day}`;
    },
  }
});