<script setup lang="ts">
import LoginForm from '../components/LoginForm.vue';
import SvgIcons from '../components/SvgIcons.vue';
</script>

<template>
    <div class="relative flex items-center overflow-hidden justify-center h-screen">
        <div class="z-10 grid lg:max-h-[556px] rounded lg:w-1/2 md:w-2/3 w-full bg-white m-10">
            <!-- Walure capital logo -->
            <!-- <SvgIcons class="flex justify-center mt-6 mb-[60px]" name="logo" /> -->
            <div class="flex justify-center mt-6 lg:mb-[60px] mb-7">                
                <img src="../assets/Walure-logo-black.png" class="w-2/5" alt="walure-logo">
            </div>
            <!-- login form -->
            <LoginForm class="grid px-10 md:px-16 mb-12 lg:mb-[92px] xl:px-36" />
        </div>
        <div class="absolute -bottom-52 md:-bottom-16 w-full z-0">
            <SvgIcons class="flex justify-center" name="login-bg" />
        </div>
    </div>
</template>
