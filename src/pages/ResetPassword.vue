<template>
    <div class="container">
        <div class="col-md-6 m-auto">
            <h1>Reset Password</h1>

            <div class="mt-3" style="color: red;">
                {{ errmessage }}
            </div>

            <div>
                <form @submit.prevent="submitReset">
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" v-model="form.password">
                    </div>
                    <div class="mb-3">
                        <label for="c_password" class="form-label">Password Confirmation</label>
                        <input type="password" class="form-control" id="c_password" v-model="form.password_confirmation">
                    </div>
                    <button type="submit" class="btn btn-primary">Reset</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios';
import { useRoute, useRouter} from 'vue-router'
import { authStore } from '../stores/authstore'

const router = useRouter();
const route = useRoute();
const useAuth = authStore();

const form = ref({
    token: route.params.token,
    email: route.query.email,
    password: '',
    password_confirmation: ''
});

const errmessage = ref();

const submitReset = async () => {
    await useAuth.getToken()
    await axios.post('/reset-password', {
        token: form.value.token,
        email: form.value.email,
        password: form.value.password,
        password_confirmation: form.value.password_confirmation
    }).then( function (response) {
        if(response.status != null){
            router.push('/login');
        }
    }).catch(function (error) {
        console.log(error.response.data.message);
        errmessage.value = error.response.data.message
    });

    
}
</script>