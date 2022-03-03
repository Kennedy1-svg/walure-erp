<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SvgIcons from './SvgIcons.vue';
import axios from 'axios';

const route = useRouter()

let rememberChecked:any = ref(false);
let isDisabled = ref(true);
let isError:any = ref(false);
let isLoading:any = ref(false);

const grant_type = computed(() => {
    return process.env.VITE_APP_GRANT_TYPE
})

let errors = reactive({
    username: false,
    usertext: '',
    password: false,
    passwordtext: '',
})

const password_pattern = '^(?=.*\\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$';
const username_pattern ='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';

let data = reactive({
    username: '',
    password: ''
})

const check:any = ():any => {
    rememberChecked.value = !rememberChecked.value;
}

const forgotPassword:any = ():any => {
    route.push('/forgot-password')
}

const login:any = async () => {
    const logindata = {
        ...data,
        grant_type: import.meta.env.VITE_APP_GRANT_TYPE,
        client_id: import.meta.env.VITE_APP_CLIENT_ID,
        client_secret: import.meta.env.VITE_APP_CLIENT_SECRET,
        scope: import.meta.env.VITE_APP_SCOPE
    }
    // data = {data, ...logindata}
    console.log('data is', logindata);
    console.log('url is', import.meta.env.VITE_APP_ROOT_API);
    
    const result = await axios.post(`${import.meta.env.VITE_APP_ROOT_API}/connect/token`, logindata, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    console.log('result is', result);
    
    // route.push('/dashboard')
}

const checkError:any = () => {
    if (!data.username) {
        errors.username = true;
        errors.usertext = 'Username is required'
    } else if (!data.username.match(username_pattern)) {
        errors.usertext = `Username must match pattern 'brainadams@gmail.com'`
    } else {
        errors.username = false;
    }

    if (!data.password) {
        errors.password = true;
        errors.passwordtext = 'Password is required'
    } else if (!data.password.match(password_pattern)) {
        errors.passwordtext = 'Password must be at least 8 characters, contain at least one number, one symbol, one uppercase and one lowercase letter'
    } else {
        errors.password = false;
    }

    if (errors.username) {
        errors.username = true;
        isError.value = true;
    } else if (errors.password) {
        errors.password = true;
        isError.value = true;
    } else {
        isError.value = false;
        isDisabled.value = false;
    }   
}

const submit:any = () => {
    console.log('hello');
    checkError();
    !isError.value ? login() : '';
}

onMounted(() => {
    console.log('hello Walure');
    console.log('client_id', import.meta.env.VITE_APP_CLIENT_ID);
    
})
</script>

<template>
    <div class="main w-full bg-white">
        <form class="text-sm grid my10">
            <div class="grid gap-1 mb-4">
                <label for="username" class="font-semibold">
                    Username
                </label>
                <input type="text" name="username" v-model="data.username" id="username" @focus="checkError" @keyup="checkError" @blur="checkError()" placeholder="Enter username" :class="[errors.username ? 'border text-red border-red' : '']" class="p-4 rounded-md bg-gray-50 text-xs focus:outline-none">
                <p class="text-[10px] text-red">
                    {{ errors.username ? errors.usertext : '' }}
                </p>
            </div>
            <div class="grid gap-1 mt-4 mb-2">
                <label for="password" class="font-semibold">
                    Password
                </label>
                <input type="password" @focus="checkError" @keyup="checkError" name="password" id="password" placeholder="Enter password" v-model="data.password" :class="[errors.password ? 'border text-red border-red' : '']" class="p-4 rounded-md bg-gray-50 text-xs focus:outline-none">
                <p class="text-[10px] text-red">
                    {{ errors.password ? errors.passwordtext : '' }}
                </p>
            </div>
            <div class="extras flex justify-between items-center text-[10px] text-blue-600 mt-2 mb-8">
                <div class="forgot">
                    <button @click.prevent="forgotPassword">
                        Forgot password?
                    </button>
                </div>
                <div class="remember flex">
                    <div class="flex items-center">
                        <input id="list-check" @click.prevent="check" type="checkbox" class="opacity-0 absolute h-5 w-5" />
                        <div class="bg-primary text-primary border-2 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-primary">
                        <SvgIcons v-if="rememberChecked" class="text-white" name="tick" />
                        </div>
                    </div>
                    <label for="remember">
                        Remember me
                    </label>
                </div>
            </div>
            <div class="grid">
                <button @click.prevent="submit" :disabled="isDisabled" :class="[isDisabled ? 'bg-grey' : 'bg-primary']" class="p-4 font-bold flex justify-center border text-white rounded-md">Login</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
</style>