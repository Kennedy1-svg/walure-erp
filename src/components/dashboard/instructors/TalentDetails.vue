<script lang="ts">
export default {
    name: 'TalentDetails',
}
</script>

<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue';

</script>

<template>
    <div class="main grid px-[45px]">
        <div class="grid mb-7">
            <div class="flex justify-between py-[53px] items-center ">
                <p class="text-2xl">Talent Details</p>
                <SvgIcons name="cancel" class="cursor-pointer" />
            </div>
            <!-- <div class="image grid justify-items-center">
                <span class=" border p-1 rounded-full mb-9">
                    <img class="w-32 h-32 rounded-full" src="../../../assets/user_one.jpg" alt="user img">
                </span>
                <p class="text-2xl font-semibold">Marcus Smith</p>
                <p class="text-grey font-medium">Talent</p>
            </div> -->
        </div>
        <div class="bottom">
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>First name</p>
                <p>Tope</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Last name</p>
                <p>Tope</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Other name(s)</p>
                <p>Tope</p>
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
                <p>Role</p>
                <p>DevOps</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Skills</p>
                <p>kubernetes, ansible, terraform</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Proficiency</p>
                <p>Intermediate</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Status</p>
                <p>Active</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Resume</p>
                <p>DevOps</p>
            </div>
        </div>
    </div>
</template>
