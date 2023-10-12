<template>
    <div class="container">
        <div class="col-md-6 m-auto">
            <h1>Register Page</h1>

            <div class="mt-3" style="color: red;">
                {{ errmessage }}
            </div>

            <div>
                <form @submit.prevent="submitRegister">
                    <div class="mb-3">
                        <label for="fname" class="form-label">First Name</label>
                        <input type="text" class="form-control" id="fname" v-model="form.fname">
                    </div>
                    <div class="mb-3">
                        <label for="lname" class="form-label">Last Name</label>
                        <input type="text" class="form-control" id="lname" v-model="form.lname">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="form.email">
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" v-model="form.password">
                    </div>
                    <div class="mb-3">
                        <label for="c_password" class="form-label">Password Confirmation</label>
                        <input type="password" class="form-control" id="c_password" v-model="form.password_confirmation">
                    </div>
                    <button type="submit" class="btn btn-primary">Register</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios';
import { useRouter } from 'vue-router'
import { authStore } from '../stores/authstore'

const router = useRouter();
const useAuth = authStore();

const form = ref({
    fname: '',
    lname: '',
    email: '',
    password: '',
    password_confirmation: ''
});

const errmessage = ref();

const submitRegister = async () => {
    await useAuth.getToken()
    await axios.post('/register', {
        fname: form.value.fname,
        lname: form.value.lname,
        email: form.value.email,
        password: form.value.password,
        password_confirmation: form.value.password_confirmation
    }).then( function (response) {
        if(response.status === 204){
            router.push('/');
        }
    }).catch(function (error) {
        console.log(error.response.data.message);
        errmessage.value = error.response.data.message
    });

    
}
</script>