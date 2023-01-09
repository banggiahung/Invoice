<template>
  <div v-if="currentInvoice" class="container invoiceView">

    <router-link class="navLink d-flex mt-4 align-items-center" style="color: #fff;" to="/">
      <i class="fa fa-arrow-circle-left"></i>
      Trở lại
    </router-link>
    <div class="header d-flex mt-4">
      <div class="left d-flex ">
        <span>Trạng thái</span>
        <div class="statusButton d-flex "
          :class="{ paid: currentInvoice.invoicePaid, draft: currentInvoice.invoiceDraft, pending: currentInvoice.invoicePending }">
          <span class="" v-if="currentInvoice.invoicePaid">Đã thanh toán</span>
          <span class="" v-if="currentInvoice.invoiceDraft">Bản nháp</span>
          <span class="" v-if="currentInvoice.invoicePending">Chưa giải quyết</span>
        </div>
      </div>
      <div class="right d-flex">
        <button @click="toggleEditInvoice" class="btn btn-dark m-lg-2">Chỉnh sửa</button>
        <button @click="deleteInvoice(currentInvoice.docId)" class="btn btn-danger m-lg-2">Xóa</button>
        <button @click="updateStatus(currentInvoice.docId)" v-if="currentInvoice.invoicePending"
          class="btn btn-success m-lg-2">Đánh dấu đã thanh
          toán</button>
        <button @click="updateStatusToPending(currentInvoice.docId)" class="btn btn-primary m-lg-2"
          v-if="currentInvoice.invoiceDraft || currentInvoice.invoicePaid">Đánh dấu đang xử lý</button>
      </div>
    </div>
    <!-- thong tin hoa don -->

    <div class="invoiceDetails d-flex flex-column mt-4 container">
      <div class="top d-flex mt-5 " style="margin: 20px 60px;">
        <div class="d-flex flex-column ">
          <p class="h2"><span>ID: </span>{{ currentInvoice.invoiceId }}</p>
          <p class="h6">Sản phẩm: {{ currentInvoice.productDescription }}</p>
        </div>
        <div class="right d-flex flex-column justify-content-end">
          <p class="h5">{{ currentInvoice.billerStreetAddress }}</p>
          <p class="h5">{{ currentInvoice.billerCity }}</p>
          <p class="h5">{{ currentInvoice.billerZipCode }}</p>
          <p class="h5">{{ currentInvoice.billerCountry }}</p>
        </div>
      </div>
      <div class="middle d-flex row mt-4 " style="margin: 20px 60px;">
        <div class="payment d-flex flex-column col-md-4">
          <h4>Ngày tạo hóa đơn</h4>
          <p class="h4">
            {{ currentInvoice.invoiceDate }}
          </p>
          <h4 class="mt-5">Ngày đến hạn</h4>
          <p class="h4">
            {{ currentInvoice.paymentDueDate }}
          </p>
        </div>
        <div class="bill d-flex flex-column col-md-4">
          <h4>Hóa đơn của</h4>
          <p class="h5">Name: {{ currentInvoice.clientName }} </p>
          <p class="h5">Địa chỉ: {{ currentInvoice.clientStreetAddress }}</p>
          <p class="h5">Thành phố: {{ currentInvoice.clientCity }}</p>
          <p class="h5">Mã zip: {{ currentInvoice.clientZipCode }}</p>
          <p class="h5">Quốc gia: {{ currentInvoice.clientCountry }}</p>
        </div>
        <div class="send-to d-flex flex-column col-md-4">
          <h4>Gửi hóa đơn tới</h4>
          <p>Email : {{ currentInvoice.clientEmail }}</p>
        </div>
      </div>
      <div class="bottom d-flex flex-column mb-3 " style="margin: 20px 60px;">
        <div class="billingItems">
          <div class="heading d-flex">
            <p>Sản phẩm</p>
            <p>Số lượng</p>
            <p>Giá</p>
            <p>Tổng</p>
          </div>
          <div v-for="(item, index) in currentInvoice.invoiceItemList" :key="index" class="item d-flex">
            <p>{{ item.itemName }}</p>
            <p>{{ item.qty }}</p>
             <v-num #="{ number }" :value="item.price">
              <p>{{ number }} vnđ</p>
            </v-num>
            <v-num #="{ number }" :value="item.total">
              <p>{{ number }} vnđ</p>
            </v-num>
          </div>
        </div>
        <div class="total d-flex">
          <p>Tổng số tiền</p>
          <v-num #="{ number }" :value="currentInvoice.invoiceTotal">
            <p>{{ number }} vnđ</p>
          </v-num>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import VNum from "v3-num";

export default {
  name: 'Invoice',
  components: {
    VNum
  },
  data() {
    return {
      currentInvoice: null,
    }
  },
  created() {
    this.getCurrentInvoice();
  },
  methods: {
    ...mapMutations(['SET_CURRENT_INVOICE', 'TOGGLE_EDIT_INVOICE', 'TOGGLE_INVOICE']),
    ...mapActions(['DELETE_INVOICE', 'UPDATE_STATUS_TO_PAID', 'UPDATE_STATUS_TO_PENDING']),


    getCurrentInvoice() {
      this.SET_CURRENT_INVOICE(this.$route.params.invoiceId);
      this.currentInvoice = this.currentInvoiceArray[0];
    },
    toggleEditInvoice() {
      this.TOGGLE_EDIT_INVOICE();
      this.TOGGLE_INVOICE();
    },
    async deleteInvoice(docId) {
      await this.DELETE_INVOICE(docId);
      this.$router.push("/");
    },
    updateStatus(docId) {
      this.UPDATE_STATUS_TO_PAID(docId);
    },
    updateStatusToPending(docId) {
      this.UPDATE_STATUS_TO_PENDING(docId);
    }

  },

  computed: {
    ...mapState(['currentInvoiceArray', 'editInvoice']),

  },
  watch: {
    editInvoice() {
      if (!this.editInvoice) {
        this.currentInvoice = this.currentInvoiceArray[0];
      }

    }
  }
}
</script>
<style scoped>
.nav-link {
  margin-bottom: 32px;
  align-items: center;
  color: #fff;
  font-size: 12px;
}

img {
  margin-right: 16px;
  width: 7px;
  height: 10px;
}

.header,
.invoiceDetails {
  background-color: #1e2139;
  border-radius: 20px;
}

.header {
  align-items: center;
  padding: 24px 32px;
  font-size: 12px;
}

.left {
  align-items: center;
}

.header span {
  color: #dfe3fa;
  margin-right: 16px;
}

.right {
  flex: 1;
  justify-content: flex-end;
}

.right button {
  color: #fff;
}

.invoice-details {
  padding: 48px;
  margin-top: 24px;
}

.top {
  color: #dfe3fa;
  flex: 1;
}

.left {
  font-size: 12px;
}

.left p:first-child {
  font-size: 24px;
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 8px;
}

.left p:nth-child(2) {
  font-size: 16px;
}

.left span {
  color: #888eb0;
}

.right {
  font-size: 12px;
  align-items: flex-end;
}

.middle {
  color: #dfe3fa;
}

h4 {
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 12px;
}

.cl-white {
  color: #fff;
}

.billingItems {
  padding: 32px;
  border-radius: 20px 20px 0 0;
  background-color: #252945;
}

.bottom {
  margin-top: 50px;
}

.heading {
  color: #dfe3fa;
  font-size: 20px;
}

.heading p:first-child {
  flex: 3;
  text-align: left;
}

.heading p {
  flex: 1;
  text-align: right;
}

.item {
  margin-bottom: 32px;
  font-size: 16px;
  color: #fff;
}

.item:last-child {
  margin-bottom: 0;
}

.item p:first-child {
  flex: 3;
  text-align: left;
}

.item p {
  flex: 1;
  text-align: right;
}

.total {
  color: #fff;
  padding: 32px;
  background-color: rgba(12, 14, 22, 0.7);
  align-items: center;
  border-radius: 0 0 20px 20px;
}

.total p {
  flex: 1;
  font-size: 20px;
}

.total p:nth-child(2) {
  font-size: 28px;
  text-align: right;
}
</style>
