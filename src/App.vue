<template>
  <div v-if="invoiceLoaded">
    <div v-if="!mobile" class="app d-flex flex-row">
      <Nav-Bar></Nav-Bar>

      <div class="appContent d-flex position-relative">
        <ModalVue v-if="modalActive" />
        <transition name="invoice">
          <InvoiceModal v-if="invoiceModal"></InvoiceModal>

        </transition>

        <router-view />
      </div>
    </div>
    <div v-else class="mobileTitle d-flex flex-column text-center align-item-center justify-content-center ">
      <h2>Xin lỗi thiết bị của bạn không được hỗ trợ</h2>
      <p class=" mt-3">Vui lòng sử dụng máy tính hoặc máy tính bảng</p>
      <span>Xin cảm ơn!!!</span>
    </div>
    <!-- <v-num #="{ number }" :value="1000000">
      {{ number }}
    </v-num> -->
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import NavBar from './components/NavBar.vue';
import InvoiceModal from './components/InvoiceModal.vue';
import ModalVue from './components/Modal.vue';
import VNum from "v3-num";
export default {
  name: 'App',
  data() {
    return {
      mobile: null,
      value: 100000,
    }
  },
  components: {
    NavBar,
    InvoiceModal,
    ModalVue,
    VNum
  },
  created() {
    this.GET_INVOICE();
    this.checkScreen();
    window.addEventListener("resize", this.checkScreen)
  },
  methods: {
    ...mapActions(['GET_INVOICE']),

    checkScreen() {
      const windowWidth = window.innerWidth;
      if (windowWidth <= 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
    },

  },

  computed: {
    ...mapState(['invoiceModal', 'modalActive', 'invoiceLoaded']),



  },
}
</script>
<style>
.app {
  background-color: #141625;
  min-height: 100vh;

}

.appContent {
  padding: 0 20px;
  flex: 1;

}

.navLink {
  text-decoration: none;
  color: initial;
}

@media(min-width: 900px) {
  .app {
    flex-direction: row !important;
  }
}

.mobileTitle {
  height: 100vh;
  background-color: #141625;
  color: #fff;
}

.mobileTitle span {
  font-weight: 800;
}

/* chuyen dong */

.invoice-enter-active,
.invoice-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.invoice-enter,
.invoice-leave-to {
  transform: translateX(100px);
  opacity: 0;
}

/* status */
.statusButton::before {
  content: "";
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 8px;
}

.statusButton {
  font-size: 12px;
  margin-right: 30px;
  align-items: center;
  padding: 8px 30px;
  border-radius: 10px;
}

.paid::before {
  background-color: #33d69f;

}

.paid {
  color: #33d69f;
  background-color: rgba(51, 214, 160, 0.1);
}

.pending::before {
  background-color: #ff8f00;

}

.pending {
  color: #ff8f00;
  background-color: rgba(255, 145, 0, 0.1);
}

.draft::before {
  background-color: #dfe3fa;
}

.draft {
  color: #dfe3fa;
  background-color: rgba(223, 227, 250, 0.1);
}
</style>
