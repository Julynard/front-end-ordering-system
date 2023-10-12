import { defineStore } from 'pinia';
import axios from 'axios';

export const customerStore = defineStore('customers', {
    state: () => ({
        customerList: null,
    }),
    getters: {
        c_list: (state) => state.customerList,
    },
    actions: {
        async getCustomerList(id) {
            const data = await axios.get(`/api/customers/${id}`);
            this.customerList = data.data;
        },
    },
});
