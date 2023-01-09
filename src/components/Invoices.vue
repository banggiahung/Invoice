<template>
    <router-link class="row invoice justify-content-between mb-4"
        :to="{ name: 'Invoice', params: { invoiceId: invoice.invoiceId } }">
        <div class="d-flex col align-items-center">
            <span class="trackingNumber col-4">#{{ invoice.invoiceId }}</span>
            <span class="dueDate col-4">{{ invoice.paymentDueDate }}</span>
            <span class="person col-4">{{ invoice.clientName }}</span>

        </div>
        <div class="d-flex col justify-content-between align-items-center">
            <span class="price h-50">{{ invoice.invoiceTotal }}đ</span>
            <div class="statusButton d-flex "
                :class="{ paid: invoice.invoicePaid, draft: invoice.invoiceDraft, pending: invoice.invoicePending }">
                <span class="" v-if="invoice.invoicePaid">Đã thanh toán</span>
                <span class="" v-if="invoice.invoiceDraft">Bản nháp</span>
                <span class="" v-if="invoice.invoicePending">Chưa giải quyết</span>
            </div>
            <div class="icon ">
                <i class="fa fa-arrow-right"></i>
            </div>
        </div>
    </router-link>

</template>

<script>
export default {
    name: 'Invoices',
    props: ['invoice']
}
</script>

<style scoped>
.invoice {
    background-color: #1e2139;
    border-radius: 20px;
    padding: 28px 32px;
    color: #fff;
    cursor: pointer;
    text-decoration: none;
}

.invoice span {
    font-size: 12px;
}

.trackingNumber {
    text-transform: uppercase;
}

.price {
    font-size: 16px;
    font-weight: 600px;
}
</style>