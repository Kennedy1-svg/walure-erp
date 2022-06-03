<script lang="ts">
export default {
  name: 'ForgotPasswordForm',
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
    email: false,
    usertext: '',
    password: false,
    passwordtext: '',
})

const password_pattern = '^(?=.*\\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$';
const email_pattern ='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';

let data = reactive({
    email: '',
    password: ''
})

const check:any = ():any => {
    rememberChecked.value = !rememberChecked.value;
}

const goback:any = ():any => {
    route.push('/')
}

const forgotpwd:any = async () => {
    isLoading.value = true;
    isDisabled.value = true;
    const params = new URLSearchParams();

    params.append('email', data.email);
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
    if (!data.email) {
        errors.email = true;
        errors.usertext = 'Email is required';
        isDisabled.value = true;
    } else if (!data.email.match(email_pattern)) {
        errors.email = true;
        errors.usertext = `Email must match pattern 'brainadams@gmail.com'`
        isDisabled.value = true;
    } else {
        isDisabled.value = false;
        errors.email = false;
    }

    if (errors.email) {
        errors.email = true;
        isError.value = true;
    } else {
        isError.value = false;
        isDisabled.value = false;
    }   
}

const submit:any = () => {
    console.log('hello');
    checkError();
    !isError.value ? forgotpwd() : '';
}
</script>

<template>
    <div class="relative main w-full bg-white">
        <form class="text-sm grid gap-7">
            <div class="grid gap-1 mb-4">
                <label for="email" class="font-semibold">
                    Email
                </label>
                <input type="email" name="email" v-model="data.email" id="email" @focus="checkError" @keyup="checkError" @blur="checkError()" placeholder="Enter email" :class="[errors.email ? 'border text-red border-red' : '']" class="p-4 rounded-md bg-gray-50 text-xs focus:outline-none">
                <p class="text-[10px] text-red">
                    {{ errors.email ? errors.usertext : '' }}
                </p>
            </div>
            <div class="grid gap-3">
                <button @click.prevent="submit" :disabled="isDisabled" :class="[isDisabled ? 'bg-grey' : 'bg-primary']" class="p-4 font-bold flex justify-center border text-white rounded-md">
                    <span class="px-4 flex" :class="[isLoading ? '' : 'hidden']">
                        <spinner />
                    </span>
                    Send
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