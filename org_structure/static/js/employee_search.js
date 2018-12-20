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
    selectedJobTitle: null,
    selectedEmployee: {},
    keyword: '',
    jobTitleKeyword: '',
    filterDepartments: [],
  },
  mounted: function() {
    this.searchEmployees();
    this.getDepartments();
    this.newEmployee.join_date = this.getToday();
  },
  methods: {
    searchEmployees: function() {
      this.selectedJobTitle = null;
      axios.get(`/api/employee/?name=${this.keyword}&department=${this.filterDepartments}`)
        .then((response) => {
          this.employees = response.data;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    getSelectedEmployee: function(employee) {
      this.selectedEmployee = employee;
      this.jobTitleKeyword = employee.job_title_name;
      this.selectedJobTitle = employee.job_title;
    },
    // Handle options of add/edit form ---------------------------
    getDepartments: function() {
      axios.get('/api/department/')
        .then((response) => {
          this.departments = response.data;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    searchJobTitleOptions: function () {
      axios.get(`/api/job-title/?search=${this.jobTitleKeyword}`)
        .then((response) => {
          this.jobTitles = response.data;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    showJobTitleOptions: function() {
      this.searchJobTitleOptions();
      document.querySelector('#job-title-options-add').removeAttribute('style');
      document.querySelector('#job-title-options-edit').removeAttribute('style');
    },
    hideJobTitleOptions: function () {
      if (this.jobTitles.length === 0) {
        this.selectedJobTitle = null;
      }
      for (let i = 0; i < this.jobTitles.length; i++) {
        if (this.jobTitles[i].name === this.jobTitleKeyword) {
          this.selectedJobTitle = this.jobTitles[i].id;
          break;
        } else if (i === this.jobTitles.length - 1) {
          this.selectedJobTitle = null;
        }
      }
      setTimeout(
        function () {
          document.querySelector('#job-title-options-add').setAttribute('style', 'display: none;')
          document.querySelector('#job-title-options-edit').setAttribute('style', 'display: none;')
        }, 300
      )
    },
    // Make changes to data ---------------------------
    selectJobTitle: function(jobTitle) {
      this.selectedJobTitle = jobTitle.id;
      this.jobTitleKeyword = jobTitle.name;
    },
    addEmployee: function() {
      this.hideJobTitleOptions();
      // Create job title first if the job title doesn't exist
      if (!this.selectedJobTitle) {
        axios.post('/api/job-title/', {name: this.jobTitleKeyword})
          .then((response) => {
            this.newEmployee.job_title = response.data.id;
            this.postEmployee();
          })
          .catch((error) => {
            console.log(error.response);
          });
      } else {
        this.newEmployee.job_title = this.selectedJobTitle;
        this.postEmployee();
      }
    },
    postEmployee: function() {
      axios.post('/api/employee/', this.newEmployee)
        .then((response) => {
          $('#employeeAddModal').modal('toggle');
          this.newEmployee = {
            first_name: '',
            last_name: '',
            department: '',
            job_title: '',
            join_date: '',
          };
          this.newEmployee.join_date = this.getToday();
          this.jobTitleKeyword = '';
          this.selectJobTitle = null;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    updateEmployee: function() {
      this.hideJobTitleOptions();
      let data = {
        first_name: this.selectedEmployee.first_name,
        last_name: this.selectedEmployee.last_name,
        department: this.selectedEmployee.department,
        job_title: this.selectedJobTitle,
        join_date: this.selectedEmployee.join_date,
        left_date: this.selectedEmployee.left_date,
      };
      if (data.left_date === '') {
        data.left_date = null;
      }
      // Create job title first if the job title doesn't exist
      if (!this.selectedJobTitle) {
        axios.post('/api/job-title/', {name: this.jobTitleKeyword})
          .then((response) => {
            data.job_title = response.data.id;
            this.putEmployee(data);
          })
          .catch((error) => {
            console.log(error.response);
          });
      } else {
        this.putEmployee(data);
      }
    },
    putEmployee: function(data) {
      axios.put(`/api/employee/${this.selectedEmployee.id}/`, data)
        .then((response) => {
          $('#employeeDetailsModal').modal('toggle');
          this.searchEmployees();
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    deleteEmployee: function() {
      axios.delete(`/api/employee/${this.selectedEmployee.id}/`)
        .then((response) => {
            $('#employeeDeleteModal').modal('toggle');
            this.searchEmployees();
          })
          .catch((error) => {
            console.log(error.response);
          });
    },
    // Util ---------------------------
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