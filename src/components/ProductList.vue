<template>
    <div class="card rounded p-5">
        
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product.id">
                    <td><router-link :to="'/products/' + product.id" class="btn btn-link">{{ product.name }}</router-link></td>
                    <td>{{ product.price }}</td>

                    <div v-if="role === 'Admin'">
                        <td>
                            <router-link :to="'/products/' + product.id" class="btn btn-primary">View</router-link>
                            <router-link :to="'/products/' + product.id + '/edit'" class="btn btn-warning mx-2">Edit</router-link>
                            <button @click="deleteProduct(product.id)" type="button" class="btn btn-danger">Delete</button>
                        </td>
                    </div>
                    <div v-else>
                        <td>
                            <button @click="addToCart(product)" type="button" class="btn btn-primary">Add to Cart</button>
                        </td>
                    </div>
                </tr>
            </tbody>
        </table>

        <div v-if="cart.length > 0">
            <h2>Cart</h2>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in cart" :key="item.id">
                        <td>{{ item.name }}</td>
                        <td>{{ item.price }}</td>
                        <td>
                            <button @click="removeFromCart(item.id)" type="button" class="btn btn-danger">Remove from Cart</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button @click="checkout" type="button" class="btn btn-success">Checkout</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            products: [],
            role: null,
            cart: [], 
            curr_email: null,
        }
    },
    async created() {
        try {
            const response = await axios.get('/api/products');
            this.products = response.data;

            const current_user = await axios.get('/api/current-user');
            this.role = current_user.data.role;
            this.curr_email = current_user.data.email;

        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        async deleteProduct(id) {
            try {
                await axios.delete(`/api/products/${id}`);
                this.products = this.products.filter(product => product.id !== id);
            } catch (error) {
                console.error(error);
            }
        },
        async addToCart(product) {
            try {
                this.cart.push(product);
            } catch (error) {
                console.error(error);
            }
        },
        removeFromCart(id) {
            this.cart = this.cart.filter(item => item.id !== id);
        },
        checkout(){
            const productIds = this.cart.map(item => item.id);
            const userEmail = this.curr_email;

            axios.post('/api/checkout', { productIds, userEmail })
                .then(response => {
                    // Handle success, response.data should contain the products
                    alert('Checkout successful!');
                    console.log(response)
                    this.cart = [];
                })
                .catch(error => {
                    // Handle error
                    console.error(error);
                });
        }
    }
}
</script>
