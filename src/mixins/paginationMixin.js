export default {
  data() {
    return {
      pagination: {
        per_page: 12,
        total_page: '',
        current_page: '',
        current_page_data: [],
      },
    };
  },
  methods: {
    getPage() {
      this.pagination.total_page = Math.ceil(this.tempData.length / this.pagination.per_page);
      this.updatePage(1);
    },
    updatePage(nowPage) {
      this.pagination.current_page = nowPage;
      this.pagination.current_page_data = [];
      const minData = this.pagination.current_page * this.pagination.per_page
        - this.pagination.per_page + 1;
      const maxData = this.pagination.current_page * this.pagination.per_page;
      this.tempData.forEach((item, index) => {
        const num = index + 1;
        if (num >= minData && num <= maxData) {
          this.pagination.current_page_data.push(item);
        }
      });
    },
  },
};
