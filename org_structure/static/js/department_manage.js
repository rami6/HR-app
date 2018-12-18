axios.defaults.headers.common['X-CSRFToken'] = Cookies.get('csrftoken');
axios.defaults.headers.post['Content-Type'] = 'application/json';

new Vue({
  el: '#content',
  delimiters: ['${', '}'],
  data: {
    departments: [],
    newDepartment: {
      name: '',
    },
    selectedDepartment: {
      id: '',
      name: '',
    },
    errorMessage: null,
  },
  mounted: function () {
    this.getDepartments();

    const vueThis = this;
    $('#departmentDeleteModal').on('hidden.bs.modal', function (e) {
      vueThis.errorMessage = null;
    })
  },
  methods: {
    getDepartments: function () {
      axios.get('/api/department/')
        .then((response) => {
          this.departments = response.data;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    getSelectedDepartment: function(department_id) {
      axios.get(`/api/department/${department_id}/`)
        .then((response) => {
          const data = response.data;
          this.selectedDepartment = {
            id: data.id,
            name: data.name,
          };
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    addDepartment: function () {
      axios.post('/api/department/', this.newDepartment)
        .then((response) => {
          $('#departmentAddModal').modal('toggle');
          this.newDepartment = '';
          this.getDepartments();
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    updateDepartment: function() {
      axios.put(`/api/department/${this.selectedDepartment.id}/`, this.selectedDepartment)
        .then((response) => {
          $('#departmentEditModal').modal('toggle');
          this.getDepartments();
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    deleteDepartment: function () {
      axios.delete(`/api/department/${this.selectedDepartment.id}/`)
        .then((response) => {
          $('#departmentDeleteModal').modal('toggle');
          this.getDepartments();
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response.data.split(' ')[0] === "ProtectedError") {
            this.errorMessage = 'Cannot delete the department because it is referenced through a protected foreign key.';
          } else {
            this.errorMessage = 'Error.';
          }
        });
    }
  }
});