<template>
    <div @click="checkClick" ref="invoiceWrap" class="invoiceWrap d-flex flex-wrap flex-column ">

        <form @submit.prevent="submitForm" class="invoiceContent position-relative">
            <loading v-show="loading"></loading>
            <h1 v-if="!editInvoice">Hóa đơn mới</h1>
            <h1 v-else>Sửa hóa đơn</h1>

            <!-- Hóa đơn gửi từ -->
            <div class="billFrom mt-5">
                <h6 class="cl-p">Hóa đơn gửi từ</h6>
                <div class="mb-3 mt-4">
                    <label for="billerStreetAddress" class="form-label">Địa chỉ</label>
                    <input required type="text" class="form-control" id="billerStreetAddress"
                        aria-describedby="emailHelp" v-model="billerStreetAddress">
                </div>
                <div class="mb-3 row">
                    <div class="col-4">
                        <label for="billerCity" class="form-label ">Thành phố</label>
                        <input required type="text" class="form-control  " id="billerCity" v-model="billerCity">
                    </div>
                    <div class="col-4">
                        <label for="billerZipCode" class="form-label">Mã Zip</label>
                        <input required type="text" class="form-control " id="billerZipCode" v-model="billerZipCode">
                    </div>
                    <div class="col-4">
                        <label for="billerCountry" class="form-label">Quận</label>
                        <input required type="text" class="form-control " id="billerCountry" v-model="billerCountry">
                    </div>
                </div>
                <!--Tới hóa đơn  -->
                <div class="billTo mt-5">
                    <h6 class="cl-p">Tới hóa đơn</h6>
                    <div class="mb-3 mt-4">
                        <label for="clientName" class="form-label">Name</label>
                        <input required type="text" class="form-control" id="clientName" aria-describedby="emailHelp"
                            v-model="clientName">
                    </div>
                    <div class="mb-3">
                        <label for="clientEmail" class="form-label">Tới email</label>
                        <input required type="email" class="form-control" id="clientEmail" v-model="clientEmail">
                    </div>
                    <div class="mb-3">
                        <label for="clientStreetAddress" class="form-label">Địa chỉ</label>
                        <input required type="text" class="form-control" id="clientStreetAddress"
                            v-model="clientStreetAddress">
                    </div>
                    <div class="mb-3 row">
                        <div class="col-4">
                            <label for="clientCity" class="form-label ">Thành phố</label>
                            <input required type="text" class="form-control  " id="city" v-model="clientCity">
                        </div>
                        <div class="col-4">
                            <label for="clientZipCode" class="form-label">Mã Zip</label>
                            <input required type="text" class="form-control " id="clientZipCode"
                                v-model="clientZipCode">
                        </div>
                        <div class="col-4">
                            <label for="clientCountry" class="form-label">Địa chỉ</label>
                            <input required type="text" class="form-control " id="clientCountry"
                                v-model="clientCountry">
                        </div>


                    </div>
                </div>

            </div>
            <!-- Thực hiện hóa đơn -->
            <div class="invoiceWork row">
                <div class="mb-3 col-md-6">
                    <label for="invoiceDate" class="form-label">Ngày tạo hóa đơn</label>
                    <input disabled type="text" class="form-control" id="invoiceDate" aria-describedby="emailHelp"
                        v-model="invoiceDate">
                </div>
                <div class="mb-3 col-md-6">
                    <label for="paymentDueDate" class="form-label">Hạn thanh toán</label>
                    <input disabled type="text" class="form-control" id="paymentDueDate" aria-describedby="emailHelp"
                        v-model="paymentDueDate">
                </div>
                <div class="mb-3">
                    <label for="paymentTerms" class="form-label">Kỳ hạn thanh toán</label>
                    <select id="paymentTerms" class="form-select" v-model="paymentTerms">
                        <option value="30">30 Ngày</option>
                        <option value="60">60 Ngày</option>
                        <option value="90">90 Ngày</option>

                    </select>
                </div>
                <div class="mb-3">
                    <label for="productDescription" class="form-label">Sản phẩm chi tiết</label>
                    <input required type="text" class="form-control" id="productDescription"
                        aria-describedby="emailHelp" v-model="productDescription">
                </div>
            </div>
            <div class="workItems">
                <h6 class="cl-g">Danh sách sản phẩm</h6>
                <table class="table ">
                    <tr class="mb-4  " style="color: #fff">
                        <th class="itemsName">Tên sản phẩm</th>
                        <th class="qty">Số lượng</th>
                        <th class="price">Giá sản phẩm</th>
                        <th class="total">Tổng</th>
                    </tr>
                    <tr class="" v-for="(item, index) in invoiceItemList" :key="index">
                        <td class="mb-3"> <input type="text" v-model="item.itemName"></td>
                        <td class="mb-3"><input type="text" v-model="item.qty"></td>
                        <td class="mb-3"><input type="text" v-model="item.price"></td>
                        <td class="cl-white">{{ (item.total = item.qty * item.price) }}đ
                            <i @click="deleteInvoiceItems(item.id)" class="fa-solid fa-trash"></i>

                        </td>
                    </tr>
                </table>
                <div @click="addNewInvoice" class="d-flex addItemsBtn justify-content-center align-items-center"
                    style="height: 50px;">
                    <i class="mgr-4 fa-solid fa-circle-plus"></i>
                    Thêm mới sản phẩm khác
                </div>
                <div class="d-flex justify-content-between mt-4 ">
                    <button type="button" @click="closeInvoice" class="btn btn-danger f-s-12 ">Xóa
                        hóa đơn</button>
                    <div class="d-flex ">
                        <button v-if="!editInvoice" type="submit" @click="saveDraft"
                            class="btn btn-secondary f-s-12 mgr-4">Tạo bản
                            nháp</button>
                        <button v-if="!editInvoice" type="submit" @click="publicInvoice"
                            class="btn btn-success f-s-12">Tạo hóa đơn</button>
                        <button v-if="editInvoice" type="submit" @click="publicInvoice"
                            class="btn btn-success f-s-12">Hoàn thành</button>
                    </div>
                </div>
            </div>

        </form>

    </div>

</template>

<script>
import db from '../firebase/firebaseInit'
import { collection, addDoc, getDoc, updateDoc, doc } from "firebase/firestore";
import { mapActions, mapMutations, mapState } from 'vuex'
import { uid } from 'uid';
import loading from "../components/Loading.vue";

export default {
    name: 'InvoiceModal',
    components: {
        loading
    },

    data() {
        return {
            docId: null,
            dateOptions: { year: "numeric", month: "2-digit", day: "2-digit" },
            billerStreetAddress: null,
            billerCity: null,
            billerZipCode: null,
            billerCountry: null,
            clientName: null,
            clientEmail: null,
            clientStreetAddress: null,
            clientCity: null,
            clientZipCode: null,
            clientCountry: null,
            invoiceDate: null,
            paymentTerms: null,
            paymentDueDateUnix: null,
            paymentDueDate: null,
            productDescription: null,
            invoicePending: null,
            invoiceDraft: null,
            invoiceItemList: [],
            invoiceTotal: 0,
            invoiceId: null,
            invoiceDateUnix: null,
            loading: null
        }
    },
    created() {
        // lay ngay hom nay
        if (!this.editInvoice) {
            const d = Date.now();
            this.invoiceDate = new Date(d).toLocaleDateString("en-US", this.dateOptions);
        }
        if (this.editInvoice) {
            const currentInvoice = this.currentInvoiceArray[0];
            this.docId = currentInvoice.docId;
            this.billerStreetAddress = currentInvoice.billerStreetAddress;
            this.billerCity = currentInvoice.billerCity;
            this.billerZipCode = currentInvoice.billerZipCode;
            this.billerCountry = currentInvoice.billerCountry;
            this.clientName = currentInvoice.clientName;
            this.clientEmail = currentInvoice.clientEmail;
            this.clientStreetAddress = currentInvoice.clientStreetAddress;
            this.clientCity = currentInvoice.clientCity;
            this.clientZipCode = currentInvoice.clientZipCode;
            this.clientCountry = currentInvoice.clientCountry;
            this.invoiceDateUnix = currentInvoice.invoiceDateUnix;
            this.invoiceDate = currentInvoice.invoiceDate;
            this.paymentTerms = currentInvoice.paymentTerms;
            this.paymentDueDateUnix = currentInvoice.paymentDueDateUnix;
            this.paymentDueDate = currentInvoice.paymentDueDate;
            this.productDescription = currentInvoice.productDescription;
            this.invoicePending = currentInvoice.invoicePending;
            this.invoiceDraft = currentInvoice.invoiceDraft;
            this.invoiceItemList = currentInvoice.invoiceItemList;
            this.invoiceTotal = currentInvoice.invoiceTotal;
        }

    },
    methods: {
        ...mapMutations(['TOGGLE_INVOICE', 'TOGGLE_MODAL', 'TOGGLE_EDIT_INVOICE']),
        ...mapActions(['UPDATE_INVOICE', 'GET_INVOICE']),
        checkClick(e) {
            if (e.target === this.$refs.invoiceWrap) {

                this.TOGGLE_MODAL();

            }
        },
        closeInvoice() {
            this.TOGGLE_INVOICE();
            if (this.editInvoice) {
                this.TOGGLE_EDIT_INVOICE();
            }
        },
        addNewInvoice() {
            this.invoiceItemList.push(
                {
                    id: uid(),
                    itemName: "",
                    qty: "",
                    price: 0,
                    total: 0
                }
            );
        },
        deleteInvoiceItems(id) {
            this.invoiceItemList = this.invoiceItemList.filter(item => item.id !== id);
        },
        calInvoiceTotal() {
            this.invoiceTotal = 0;
            this.invoiceItemList.forEach(item => {
                this.invoiceTotal += item.total
            });
        },
        publicInvoice() {
            this.invoicePending = true;
        },
        saveDraft() {
            this.invoiceDraft = true;
        },
        async uploadInvoice() {
            if (this.invoiceItemList.length <= 0) {
                alert("Please ensure you filled out work items!");
                return;
            }
            this.loading = true;
            this.calInvoiceTotal();
            const docRef = doc(db, "invoices", this.docId);
            const dataObj = {
                billerStreetAddress: this.billerStreetAddress,
                billerCity: this.billerCity,
                billerZipCode: this.billerZipCode,
                billerCountry: this.billerCountry,
                clientName: this.clientName,
                clientEmail: this.clientEmail,
                clientStreetAddress: this.clientStreetAddress,
                clientCity: this.clientCity,
                clientZipCode: this.clientZipCode,
                clientCountry: this.clientCountry,
                paymentTerms: this.paymentTerms,
                paymentDueDate: this.paymentDueDate,
                paymentDueDateUnix: this.paymentDueDateUnix,
                productDescription: this.productDescription,
                invoiceItemList: this.invoiceItemList,
                invoiceTotal: this.invoiceTotal,
            }
            this.loading = false;
            const data = {
                docId: this.docId,
                routeId: this.$route.params.invoiceId,
            };
            updateDoc(docRef, dataObj);

            this.UPDATE_INVOICE(data);


        },

        async updateInvoice() {
            if (this.invoiceItemList.length <= 0) {
                alert('nhap du lieu vao danh sach');
                return;
            }

            this.loading = true;
            this.calInvoiceTotal();

            const dataBase = collection(db, 'invoices');
            const dataObj = {
                invoiceId: uid(6),
                billerStreetAddress: this.billerStreetAddress,
                billerCity: this.billerCity,
                billerZipCode: this.billerZipCode,
                billerCountry: this.billerCountry,
                clientName: this.clientName,
                clientEmail: this.clientEmail,
                clientStreetAddress: this.clientStreetAddress,
                clientCity: this.clientCity,
                clientZipCode: this.clientZipCode,
                clientCountry: this.clientCountry,
                invoiceDate: this.invoiceDate,
                invoiceDateUnix: this.invoiceDateUnix,
                paymentTerms: this.paymentTerms,
                paymentDueDate: this.paymentDueDate,
                paymentDueDateUnix: this.paymentDueDateUnix,
                productDescription: this.productDescription,
                invoiceItemList: this.invoiceItemList,
                invoiceTotal: this.invoiceTotal,
                invoicePending: this.invoicePending,
                invoiceDraft: this.invoiceDraft,
                invoicePaid: null,
            }
            await addDoc(dataBase, dataObj)
            this.loading = false;

            this.TOGGLE_INVOICE();
            this.GET_INVOICE();


        },
        submitForm() {
            if (this.editInvoice) {
                this.uploadInvoice();
                return;
            }
            this.updateInvoice();

        },
    },
    computed: {
        ...mapState(['editInvoice', 'currentInvoiceArray'])
    },
    watch: {
        paymentTerms() {
            const futureDate = new Date();
            this.paymentDueDateUnix = futureDate.setDate(futureDate.getDate() + parseInt(this.paymentTerms));
            this.paymentDueDate = new Date(this.paymentDueDateUnix).toLocaleDateString('en-us', this.dateOptions);
        }
    },
}
</script>

<style>
form {
    font-size: 12px;
}

.invoiceWrap {
    position: fixed;
    top: 0;
    left: 0;
    background-color: transparent;
    width: 100%;
    height: 100vh;
    overflow: scroll;

}

::-webkit-scrollbar {
    display: none;
}

@media(min-width: 900px) {
    .invoiceWrap {
        left: 90px;
    }
}

.invoiceContent {
    padding: 56px;
    max-width: 700px;
    width: 100%;
    background-color: #141625;
    color: #fff;
    box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.cl-p {
    color: #7c5dfa;
}

.cl-g {
    color: #777f98;
}

input,
select {
    background-color: #1e2139 !important;
    color: #fff !important;
    border: none !important;

}


.addItemsBtn {
    background-color: #252945;
    color: #fff;
    width: 100%;
    border-radius: 50px;
    cursor: pointer;
}

.addItemsBtn:hover {
    background-color: #252945;
    opacity: 0.9;
}

.mgr-4 {
    margin-right: 6px;
}

.f-s-12 {
    font-size: 12px !important;
}


.cl-white {
    color: #fff;
}


table {
    border-collapse: separate !important;
    border-spacing: 0 20px !important;
}
</style>