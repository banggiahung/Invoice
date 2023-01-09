<template>
  <div class="home container">
    <!-- header -->
    <div class="header row d-flex justify-content-center mt-5">
      <div class="col-4 d-flex flex-column ">
        <p class="h2">Hóa đơn</p>
        <span class="h6">Có tất cả {{ invoiceData.length }} hóa đơn</span>
      </div>
      <div class="col-8 d-flex justify-content-end ">
        <div @click="toggleFilterMenu" class="filter d-flex position-relative align-items-center">
          <span>Trạng thái <span v-if="filteredInvoice">: {{ filteredInvoice }}</span></span>
          <i class="cl-main fa-solid fa-caret-down"></i>
          <ul v-show="filterMenu" class="filterMenu position-absolute text-center">
            <li @click="filteredInvoices">Bản nháp</li>
            <li @click="filteredInvoices">Chưa xử lý</li>
            <li @click="filteredInvoices">Đã thanh toán</li>
            <li @click="filteredInvoices">Clear</li>
          </ul>
        </div>
        <div @click="newInvoice" class="d-flex align-items-center newIn ">
          <div class="d-flex btn-warning btn btn-outline-secondary bg-main cl-white br-40 ">
            <i class="mt-1 fa fa-plus-circle"></i>Tạo mới hóa đơn
          </div>
          <span></span>
        </div>
      </div>
      <div v-if="invoiceData.length > 0">
        <InvoicesVue v-for="(invoice, index) in filteredData" :invoice="invoice" :key="index" />
      </div>
      <div v-else class="empty d-flex flex-column align-items-center mt-5">
        <img src="../assets/illustration-empty.svg" alt="" width="214" height="200" />
        <h3 class="mt-2">Chưa có hóa đơn được tạo</h3>
        <p class="text-center mt-4">Tạo mới hóa đơn ngay nào!!! Vui lòng chọn tạo hóa đơn!!!</p>
      </div>
    </div>
    <!-- invoice -->

  </div>
</template>

<script>
// @ is an alias to /src
import { mapMutations, mapState } from 'vuex';
import InvoicesVue from '../components/Invoices.vue';
export default {
  name: 'HomeView',
  data() {
    return {
      filterMenu: null,
      filteredInvoice: null,
    }
  },
  components: {
    InvoicesVue
  },
  methods: {
    ...mapMutations(['TOGGLE_INVOICE']),
    newInvoice() {
      this.TOGGLE_INVOICE();
    },
    toggleFilterMenu() {
      this.filterMenu = !this.filterMenu
    },
    filteredInvoices(e) {
      if (e.target.innerText === "Clear") {
        this.filteredInvoice == null;
        console.log(e.target.innerText === "Clear")
        return;
      }
      this.filteredInvoice = e.target.innerText;
    },
  },
  computed: {
    ...mapState(['invoiceData']),
    filteredData() {
      return this.invoiceData.filter((invoice) => {
        if (this.filteredInvoice === "Bản nháp") {
          return invoice.invoiceDraft === true;
        }
        if (this.filteredInvoice === "Chưa xử lý") {
          return invoice.invoicePending === true;
        }
        if (this.filteredInvoice === "Đã thanh toán") {
          return invoice.invoicePaid === true;
        }
        return invoice;
      });
    },
  }
}
</script>
<style>
.home {
  color: #fff;
}

.cl-main {
  color: #7c5dfa;
}

.bg-main {
  background-color: #7c5dfa !important;
}

.filter {
  margin-right: 40px;
  cursor: pointer;
}

.cl-white {
  color: #fff !important;
}



.filter i {
  margin-left: 8px;
}

.newIn i {
  margin-right: 4px;
}

.filterMenu {
  width: 180px;
  top: 52px;
  list-style-type: none;
  background-color: #1e2139;
  box-shadow: 0 4px 6 -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1 rgba(0, 0, 0, 0.06);
}


.filter ul {
  padding-left: 0;

}

.filterMenu li {
  cursor: pointer;
  padding: 10px !important;
}

.filterMenu li:hover {
  color: #1e2139;
  background-color: #fff;
}

.br-40 {
  border-radius: 40px !important;
}
</style>
