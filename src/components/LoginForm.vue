<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SvgIcons from './SvgIcons.vue';

const route = useRouter()

let isChecked:any = ref(false);

const check:any = ():any => {
    isChecked.value = !isChecked.value;
}

const login:any = () => {
    route.push('/dashboard')
}
</script>

<template>
    <div class="main w-full bg-white">
        <form class="text-sm grid my10">
            <div class="grid gap-1 mb-4">
                <label for="username" class="font-semibold">
                    Username
                </label>
                <input type="text" name="username" id="username" placeholder="Enter username" class="p-4 rounded-md bg-gray-50 text-xs focus:outline-none">
            </div>
            <div class="grid gap-1 mt-4 mb-2">
                <label for="password" class="font-semibold">
                    Password
                </label>
                <input type="password" name="password" id="password" placeholder="Enter password" class="p-4 rounded-md bg-gray-50 text-xs focus:outline-none">
            </div>
            <div class="extras flex justify-between items-center text-[10px] text-blue-600 mt-2 mb-8">
                <div class="forgot">
                    <a href="#">
                        Forgot password?
                    </a>
                </div>
                <div class="remember flex">
                    <div class="flex items-center">
                        <input id="list-check" @click.prevent="check" type="checkbox" class="opacity-0 absolute h-5 w-5" />
                        <div class="bg-primary text-primary border-2 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-primary">
                        <SvgIcons v-if="isChecked" class="text-white" name="tick" />
                        </div>
                    </div>
                    <label for="remember">
                        Remember me
                    </label>
                </div>
            </div>
            <div class="grid">
                <button @click.prevent="login" class="p-4 font-bold flex justify-center border bg-primary text-white rounded-md">Login</button>
            </div>
        </form>
    </div>
</template>
