<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue';

</script>

<template>
    <div class="main grid px-[45px]">
        <div class="grid mb-[88px]">
            <div class="flex justify-between py-[53px] items-center ">
                <p class="text-2xl">Student Details</p>
                <SvgIcons name="cancel" class="cursor-pointer" />
            </div>
            <div class="image grid justify-items-center">
                <span class=" border p-1 rounded-full mb-9">
                    <img class="w-32 h-32 rounded-full" src="../../../assets/user_one.jpg" alt="user img">
                </span>
                <button class="rounded bg-primary text-white text-sm px-10 py-4">
                    View Passport
                </button>
            </div>
        </div>
        <div class="bottom">
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>First name</p>
                <p>Lanre</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Last name</p>
                <p>Tope</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Other name</p>
                <p>Gabriel</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Reg number</p>
                <p>WAL/STUD/00006</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Email</p>
                <p>topelanre@gmail.com</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Mobile number</p>
                <p>090345734869</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Gender</p>
                <p>Male</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Address</p>
                <p>Kokuma Street Lagos</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Status</p>
                <p>Active</p>
            </div>
        </div>
    </div>
</template>
