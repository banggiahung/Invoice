import { createStore } from 'vuex'
import db from '@/firebase/firebaseInit';
import { query, collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

export default createStore({
  state: {
    invoiceData: [],
    invoiceModal: null,
    modalActive: null,
    invoiceLoaded: null,
    currentInvoiceArray: null,
    editInvoice: null,

  },
  getters: {
  },
  mutations: {
    TOGGLE_INVOICE(state) {
      state.invoiceModal = !state.invoiceModal;
    },
    TOGGLE_MODAL(state) {
      state.modalActive = !state.modalActive;
    },
    SET_INVOICE_DATA(state, payload) {
      state.invoiceData.push(payload);
    },
    INVOICE_LOADED(state) {
      state.invoiceLoaded = true;
    },
    SET_CURRENT_INVOICE(state, payload) {
      state.currentInvoiceArray = state.invoiceData.filter(invoice => {
        return invoice.invoiceId === payload;
      });
    },
    TOGGLE_EDIT_INVOICE(stage) {
      stage.editInvoice = !stage.editInvoice;
    },
    DELETE_INVOICE(stage, payload) {
      stage.invoiceData = stage.invoiceData.filter(invoice => invoice.docId !== payload)
    },
    UPDATE_STATUS_TO_PAID(state, payload) {
      state.invoiceData.forEach((invoice) => {
        if (invoice.docId === payload) {
          invoice.invoicePaid = true;
          invoice.invoicePending = false;
        }
      });
    },
    UPDATE_STATUS_TO_PENDING(state, payload) {
      state.invoiceData.forEach((invoice) => {
        if (invoice.docId === payload) {
          invoice.invoicePaid = false;
          invoice.invoicePending = true;
          invoice.invoiceDraft = false;
        }
      });
    },
  },
  actions: {

    async GET_INVOICE({ commit, state }) {
      const rs = await getDocs(query(collection(db, 'invoices')));

      rs.forEach(doc => {
        if (!state.invoiceData.some(invoice => invoice.docId === doc.docId)) {
          const data = {
            docId: doc.id,
            invoiceId: doc.data().invoiceId,
            billerStreetAddress: doc.data().billerStreetAddress,
            billerCity: doc.data().billerCity,
            billerZipCode: doc.data().billerZipCode,
            billerCountry: doc.data().billerCountry,
            clientName: doc.data().clientName,
            clientEmail: doc.data().clientEmail,
            clientStreetAddress: doc.data().clientStreetAddress,
            clientCity: doc.data().clientCity,
            clientZipCode: doc.data().clientZipCode,
            clientCountry: doc.data().clientCountry,
            invoiceDateUnix: doc.data().invoiceDateUnix,
            invoiceDate: doc.data().invoiceDate,
            paymentTerms: doc.data().paymentTerms,
            paymentDueDateUnix: doc.data().paymentDueDateUnix,
            paymentDueDate: doc.data().paymentDueDate,
            productDescription: doc.data().productDescription,
            invoiceItemList: doc.data().invoiceItemList,
            invoiceTotal: doc.data().invoiceTotal,
            invoicePending: doc.data().invoicePending,
            invoiceDraft: doc.data().invoiceDraft,
            invoicePaid: doc.data().invoicePaid,
          };
          commit('SET_INVOICE_DATA', data)
        }
      });
      commit('INVOICE_LOADED')
    },
    async UPDATE_INVOICE({ commit, dispatch }, { docId, routeId }) {
      commit('DELETE_INVOICE', docId);
      await dispatch('GET_INVOICE');
      commit('TOGGLE_INVOICE')
      commit('TOGGLE_EDIT_INVOICE')
      commit('SET_CURRENT_INVOICE', routeId)
    },
    async DELETE_INVOICE({ commit }, docId) {
      const docRef = doc(db, "invoices", docId);
      deleteDoc(docRef);
      commit("DELETE_INVOICE", docId);
    },
    async UPDATE_STATUS_TO_PAID({ commit }, docId) {
      const getInvoice = doc(db, "invoices", docId);
      const data = {
        invoicePaid: true,
        invoicePending: false,
      };
      await updateDoc(getInvoice, data);

      commit("UPDATE_STATUS_TO_PAID", docId);
    },
    async UPDATE_STATUS_TO_PENDING({ commit }, docId) {
      const getInvoice = doc(db, "invoices", docId);
      const data = {
        invoicePaid: false,
        invoicePending: true,
        invoiceDraft: false,
      };
      await updateDoc(getInvoice, data);
      commit("UPDATE_STATUS_TO_PENDING", docId);
    },
  },
  modules: {
  }
})
