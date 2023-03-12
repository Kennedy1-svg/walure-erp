<script lang="ts">
export default {
    name: 'PayrollDetails',
}
</script>

<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue';
import { api_url } from '../../../config'
import { ref, toRefs, computed, onMounted } from 'vue';
import { useStore } from 'vuex'
import Modal from '../../Modal.vue'
import * as actionTypes from '../../../store/module/instructors/constants/action'

const store = useStore();

const showProfilePicture = ref(false);
const emits = defineEmits(['close'])

const closeModal:any = () => {
  // document.getElementById('myoal').showModal()
  console.log('close modal')
  emits('close')
}

const instructor:any = computed(() => {
    // console.log('students', JSON.parse(JSON.stringify(store.getters.getEditStudent.value)))
    // return JSON.parse(JSON.stringify(store.getters.getEditPayroll.value))
})

</script>

<template>
    <div class="main grid px-[45px]">
        <div class="grid mb-7">
            <div class="flex justify-between py-[53px] items-center ">
                <p class="text-2xl">Payroll Details</p>
                <SvgIcons name="cancel" @click="closeModal" class="cursor-pointer" />
            </div>
            <!-- {{ instructor }} -->
            <div class="image grid justify-items-center">
                <span class=" border p-1 rounded-full mb-9">
                    <!-- <img class="w-32 h-32 rounded-full" :src="instructor.image" alt="user img"> -->
                </span>
                <!-- <p class="text-2xl font-semibold">{{ instructor.fullName }}</p> -->
                <p class="text-2xl font-semibold">oka</p>
                <p class="text-grey font-medium">Payroll</p>
            </div>
        </div>
        <div class="bottom">
            <div class="grid border-y py-3 text-xl font-medium justify-items-start">
                <p>About</p>
                <!-- <p class="py-2 text-grey text-sm">
                    {{ instructor.bio }}
                </p> -->
                <p class="py-2 text-grey text-sm">
                    oisd
                </p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>First name</p>
                <!-- <p>{{ instructor.firstName }}</p> -->
                <p>dsld</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Gender</p>
                <!-- <p>{{ instructor.gender == 0 ? 'Male' : instructor.gender == 1 ? 'Female' : null }}</p> -->
                <p>nmnm</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Mobile number</p>
                <!-- <p>{{ instructor.phoneNumber }}</p> -->
                <p>jsr</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Email</p>
                <!-- <p>{{ instructor.email }}</p> -->
                <p>oiijd</p>
            </div>
            <div class="flex py-14 justify-start gap-4 items-center">
                <!-- <a target="_blank" :href="instructor.twitterUrl" >
                    <SvgIcons name="twitter" class="text-twitter cursor-pointer" />
                </a>
                <a target="_blank" :href="instructor.facebookUrl" >
                    <SvgIcons name="facebook" class="text-facebook cursor-pointer" />
                </a>
                <a target="_blank" :href="instructor.linkedInUrl" >
                    <SvgIcons name="linkedin" class="text-linkedin cursor-pointer" />
                </a> -->
            </div>
        </div>
    </div>
</template>
