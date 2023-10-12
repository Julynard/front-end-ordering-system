<template>
    <div class="container">
        <div class="col-md-6 m-auto">
            

            <div class="mt-3" style="color: green;">
                {{ errmessage }}
            </div>

            <h1>Edit Customer</h1>
            <div v-if="useCustomer.c_list">
                <form @submit.prevent="updateCustomer">
                    <div class="mb-3">
                        <label for="fname" class="form-label">First Name</label>
                        <input type="text" class="form-control" id="fname" v-model="useCustomer.c_list.fname">
                    </div>
                    <div class="mb-3">
                        <label for="lname" class="form-label">Last Name</label>
                        <input type="text" class="form-control" id="lname" v-model="useCustomer.c_list.lname">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="useCustomer.c_list.email" disabled>
                    </div>
                    <button type="submit" class="btn btn-primary">Update</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router'
import { authStore } from '../stores/authstore'
import { customerStore } from '../stores/customerstore.js'

const useCustomer = customerStore();
const router = useRouter();
const route = useRoute();
const useAuth = authStore();

const id = route.params.id;

onMounted(async () => {
    useCustomer.getCustomerList(id);
})

const form = ref({
    fname: '',
    lname: '',
});

const errmessage = ref();

const updateCustomer = async () => {
    await useAuth.getToken()
    await axios.put(`/api/customers/${id}`, {
        id: id,
        fname: useCustomer.c_list.fname,
        lname: useCustomer.c_list.lname,
    }).then( function (response) {
        if(response.status === 200){
            router.push('/customers');
        }
    }).catch(function (error) {
        console.log(error.response.data.message);
        errmessage.value = error.response.data.message
    });

    
}
</script>