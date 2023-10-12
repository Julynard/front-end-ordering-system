<template>
    <div class="card rounded p-5">
        <h3>List of Customer</h3>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="customer in customers" :key="customer.id">
                    <td>{{ customer.fname }}</td>
                    <td>{{ customer.lname }}</td>
                    <td>{{ customer.role }}</td>
                    <td>
                        <router-link :to="'/customers/' + customer.id + '/edit'" class="btn btn-warning mx-2">Edit</router-link>
                        <button @click="deleteUser(customer.id)" type="button" class="btn btn-danger">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            customers: [],
        }
    },
    async created() {
        try {
            const response = await axios.get('/api/customers');
            this.customers = response.data;
        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        async deleteUser(id) {
            try {
                await axios.delete(`/api/customers/${id}`);
                this.products = this.products.filter(product => product.id !== id);
            } catch (error) {
                console.error(error);
            }
        }
    }
}
</script>
