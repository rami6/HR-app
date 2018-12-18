axios.defaults.headers.common['X-CSRFToken'] = Cookies.get('csrftoken');
axios.defaults.headers.post['Content-Type'] = 'application/json';

new Vue({
  el: '#content',
  delimiters: ['${', '}'],
  data: {
    departments: [],
    selectedDepartment: {
      id: '',
      name: '',
    }
  },
  mounted: function () {
    this.getDepartments();
  },
  methods: {
    getDepartments: function () {
      axios.get('/api/department/')
        .then((response) => {
          this.departments = response.data;
        })
        .catch((error) => {
          console.log(error);
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
          console.log(error);
        });
    },
    updateDepartment: function() {
      axios.put(`/api/department/${this.selectedDepartment.id}/`, this.selectedDepartment)
        .then((response) => {
          $('#departmentEditModal').modal('toggle');
          this.getDepartments();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
});