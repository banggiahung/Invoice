<template>
    <div class="modal d-flex position-fixed justify-content-center align-items-center">
        <div class="modalContent">
            <p class="text-center">Bạn có chắc rằng muốn thoát? </p>
            <span class="mb-5">Những thay đổi của bạn sẽ không được lưu</span>
            <div class="action d-flex mt-3">
                <button @click="closeModal" class="btn btn-success m-lg-2 ">Trở lại</button>
                <button @click="closeInvoice" class="btn btn-danger m-lg-2">Thoát</button>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { mapMutations, mapState } from 'vuex'
export default {
    name: 'Modal',
    methods: {
        ...mapMutations(['TOGGLE_MODAL', 'TOGGLE_INVOICE', 'TOGGLE_EDIT_INVOICE']),
        closeModal() {
            this.TOGGLE_MODAL();
        },
        closeInvoice() {
            this.TOGGLE_MODAL();
            this.TOGGLE_INVOICE();
            if (this.editInvoice) {
                this.TOGGLE_EDIT_INVOICE()
            }
        }

    },
    computed: {
        ...mapState(["editInvoice"])
    },
}
</script>

<style scoped>
.modal {
    z-index: 100;
    height: 100vh;
    width: 100%;
}

.modalContent {
    border-radius: 20px;
    padding: 48px 32px;
    max-width: 450px;
    background-color: #252945;
    color: #fff;
}

button {
    flex: 1 !important;
}
</style>