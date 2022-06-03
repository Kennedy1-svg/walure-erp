<script lang="ts">
export default {
  name: 'PasswordResetForm',
}
</script>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SvgIcons from '../SvgIcons.vue';
import spinner from '../spinner.vue'
import { useStore } from 'vuex'
import * as actionTypes from '../../store/module/auth/constants/action'
import * as mutationTypes from '../../store/module/auth/constants/mutation'
import { grant_type, client_id, client_secret, scope, api_url } from '../../config'

const store = useStore();

const route = useRouter();

let rememberChecked:any = ref(false);
let isDisabled = ref(true);
let isError:any = ref(false);
let isLoading:any = ref(false);


let errors = reactive({
    defaultPwd: false,
    usertext: '',
    password: false,
    passwordtext: '',
})

const password_pattern = '^(?=.*\\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$';
const defaultPwd_pattern ='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';

let data = reactive({
    defaultPwd: '',
    password: ''
})

const check:any = ():any => {
    rememberChecked.value = !rememberChecked.value;
}

const forgotPassword:any = ():any => {
    route.push('/forgot-password')
}

const login:any = async () => {
    isLoading.value = true;
    isDisabled.value = true;
    const params = new URLSearchParams();

    params.append('defaultPwd', data.defaultPwd);
    params.append('password', data.password);
    params.append('grant_type', `${grant_type}`);
    params.append('client_id', `${client_id}`);
    params.append('client_secret', `${client_secret}`);
    params.append('scope', `${scope}`);
    
    const request:any = {
        url: `${api_url}connect/token`,
        data: params,
    }

    await store.dispatch(actionTypes.FetchData, request)
    .then(() => {
        if (store.getters.getLoginAlertText.value.includes('Successful')) {
            isLoading.value = false;
            isDisabled.value = false;
            setTimeout(() => {
                route.push('/dashboard')
            }, 600);
        } else {
            isLoading.value = false;
            isDisabled.value = false;
        }
    })    
}

const checkError:any = () => {
    if (!data.defaultPwd) {
        errors.defaultPwd = true;
        isDisabled.value = true;
        errors.usertext = 'Username is required'
    } else if (!data.defaultPwd.match(defaultPwd_pattern)) {
        errors.defaultPwd = true;
        isDisabled.value = true;
        errors.usertext = `Username must match pattern 'brainadams@gmail.com'`
    } else {
        isDisabled.value = false;
        errors.defaultPwd = false;
    }

    if (!data.password) {
        errors.password = true;
        isDisabled.value = true;
        errors.passwordtext = 'Password is required'
    } else if (!data.password.match(password_pattern)) {
        errors.password = true;
        isDisabled.value = true;
        errors.passwordtext = 'Password must be at least 8 characters, contain at least one number, one symbol, one uppercase and one lowercase letter'
    } else {
        isDisabled.value = false;
        errors.password = false;
    }

    if (errors.defaultPwd) {
        errors.defaultPwd = true;
        isError.value = true;
    } else if (errors.password) {
        errors.password = true;
        isError.value = true;
    } else {
        isError.value = false;
        isDisabled.value = false;
    }   
}

const goback:any = ():any => {
    route.push('/')
}

const submit:any = () => {
    console.log('hello');
    checkError();
    !isError.value ? login() : '';
}
</script>

<template>
    <div class="relative main w-full bg-white">
        <form class=" text-sm grid my10">
            <div class="grid gap-1 mb-4">
                <label for="defaultPassword" class="font-semibold">
                    Enter default password
                </label>
                <input type="text" name="defaultPwd" v-model="data.defaultPwd" id="defaultPwd" @focus="checkError" @keyup="checkError" @blur="checkError()" placeholder="Enter password" :class="[errors.defaultPwd ? 'border text-red border-red' : '']" class="p-4 rounded-md bg-gray-50 text-xs focus:outline-none">
                <p class="text-[10px] text-red">
                    {{ errors.defaultPwd ? errors.usertext : '' }}
                </p>
            </div>
            <div class="grid gap-1 mt-4 mb-2">
                <label for="password" class="font-semibold">
                    New Password
                </label>
                <input type="password" @focus="checkError" @keyup="checkError" name="password" id="password" placeholder="Enter password" v-model="data.password" :class="[errors.password ? 'border text-red border-red' : '']" class="p-4 rounded-md bg-gray-50 text-xs focus:outline-none">
                <p class="text-[10px] text-red">
                    {{ errors.password ? errors.passwordtext : '' }}
                </p>
            </div>
            <div class="grid gap-1 mt-4 mb-2">
                <label for="confirmpassword" class="font-semibold">
                    Confirm Password
                </label>
                <input type="password" @focus="checkError" @keyup="checkError" name="password" id="password" placeholder="Confirm password" v-model="data.password" :class="[errors.password ? 'border text-red border-red' : '']" class="p-4 rounded-md bg-gray-50 text-xs focus:outline-none">
                <p class="text-[10px] text-red">
                    {{ errors.password ? errors.passwordtext : '' }}
                </p>
            </div>
            <div class="grid gap-3">
                <button @click.prevent="submit" :disabled="isDisabled" :class="[isDisabled ? 'bg-grey' : 'bg-primary']" class="p-4 font-bold flex justify-center border text-white rounded-md">
                    <span class="px-4 flex" :class="[isLoading ? '' : 'hidden']">
                        <spinner />
                    </span>
                    Login
                </button>
                <button @click.prevent="goback" class="p-4 font-bold flex justify-center rounded-md text-primary">
                    Cancel
                </button>
            </div>
        </form>
    </div>
</template>

<style scoped>
</style>