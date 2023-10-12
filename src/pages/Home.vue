<template>
    <div class="container">
        <div v-if="useAuth.user">
            <h1>List of Products</h1>
            <!-- <span>{{ useAuth.user.name }}</span><br>
            <span>{{ useAuth.user.email }}</span>
            <h3 v-if="useAuth.user.role === 'Customer'">You are customer</h3> -->

            <ProductForm />
	        <ProductList />
        </div>
        <div v-else>
            <h3>Welcome!</h3>
        </div>
    </div>
</template>

<script setup>

import { onMounted } from 'vue'
import { authStore } from '../stores/authstore'

const useAuth = authStore();

onMounted(async () => {
    useAuth.getUser();
})
</script>