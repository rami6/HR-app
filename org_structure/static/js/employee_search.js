axios.defaults.headers.common['X-CSRFToken'] = Cookies.get('csrftoken');
axios.defaults.headers.post['Content-Type'] = 'application/json';

new Vue({
  el: '#content',
  delimiters: ['${', '}'],
  data: {
    departments: [],
  },
  mounted: function() {
    this.getDepartments();
  },
  methods: {
    getDepartments: function() {
      axios.get('/api/department/')
        .then((response) => {
          this.departments = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
});