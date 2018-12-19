axios.defaults.headers.common['X-CSRFToken'] = Cookies.get('csrftoken');
axios.defaults.headers.post['Content-Type'] = 'application/json';

new Vue({
  el: '#content',
  delimiters: ['${', '}'],
  data: {
    jobTitles: [],
    newJobTitle: {
      name: '',
    },
    selectedJobTitle: {},
    errorMessage: null,
  },
  mounted: function () {
    this.getJobTitles();

    const vueThis = this;
    $('#jobTitleDeleteModal').on('hidden.bs.modal', function (e) {
      vueThis.errorMessage = null;
    })
  },
  methods: {
    getJobTitles: function () {
      axios.get('/api/job-title/')
        .then((response) => {
          this.jobTitles = response.data;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    getSelectedJobTitle: function(jobTitle) {
      this.selectedJobTitle = jobTitle;
    },
    addJobTitle: function () {
      axios.post('/api/job-title/', this.newJobTitle)
        .then((response) => {
          $('#jobTitleAddModal').modal('toggle');
          this.newJobTitle = '';
          this.getJobTitles();
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    updateJobTitle: function() {
      const data = {
        name: this.selectedJobTitle.name,
      }
      axios.put(`/api/job-title/${this.selectedJobTitle.id}/`, data)
        .then((response) => {
          $('#jobTitleEditModal').modal('toggle');
          this.getJobTitles();
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    deleteJobTitle: function () {
      axios.delete(`/api/job-title/${this.selectedJobTitle.id}/`)
        .then((response) => {
          $('#jobTitleDeleteModal').modal('toggle');
          this.getJobTitles();
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response.data.split(' ')[0] === "ProtectedError") {
            this.errorMessage = 'Cannot delete the job title because it is referenced through a protected foreign key.';
          } else {
            this.errorMessage = 'Error.';
          }
        });
    }
  }
});