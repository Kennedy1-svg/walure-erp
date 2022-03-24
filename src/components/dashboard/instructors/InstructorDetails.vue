<script lang="ts">
export default {
    name: 'InstructorDetails',
}
</script>

<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue';

</script>

<template>
    <div class="main grid px-[45px]">
        <div class="grid mb-7">
            <div class="flex justify-between py-[53px] items-center ">
                <p class="text-2xl">Instructor Details</p>
                <SvgIcons name="cancel" class="cursor-pointer" />
            </div>
            <div class="image grid justify-items-center">
                <span class=" border p-1 rounded-full mb-9">
                    <img class="w-32 h-32 rounded-full" src="../../../assets/user_one.jpg" alt="user img">
                </span>
                <p class="text-2xl font-semibold">Marcus Smith</p>
                <p class="text-grey font-medium">Instructor</p>
            </div>
        </div>
        <div class="bottom">
            <div class="grid border-y py-3 text-xl font-medium justify-items-start">
                <p>About</p>
                <p class="py-2 text-grey text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam quis molestie aliquam leo quis. Adipiscing sit dictumst dignissim mattis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam quis molestie aliquam leo quis. Adipiscing sit dictumst dignissim mattis.
                </p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>First name</p>
                <p>Tope</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Gender</p>
                <p>Male</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Mobile number</p>
                <p>090345734869</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Email</p>
                <p>topelanre@gmail.com</p>
            </div>
            <div class="flex py-14 justify-start gap-4 items-center">
                <router-link to="" >
                    <SvgIcons name="twitter" class="text-twitter cursor-pointer" />
                </router-link>
                <router-link to="" >
                    <SvgIcons name="facebook" class="text-facebook cursor-pointer" />
                </router-link>
                <router-link to="" >
                    <SvgIcons name="linkedin" class="text-linkedin cursor-pointer" />
                </router-link>
            </div>
        </div>
    </div>
</template>
