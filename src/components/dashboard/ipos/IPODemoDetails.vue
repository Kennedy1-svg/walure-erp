<script lang="ts">
export default {
  name: 'IPODemoDetails',
}
</script>

<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue';
import { api_url } from '../../../config'
import { ref, toRefs, computed, onMounted } from 'vue';
import { useStore } from 'vuex'
import moment from 'moment';
import * as actionTypes from '../../../store/module/ipos/constants/action'

const store = useStore();

const showProfilePicture = ref(false);
const emits = defineEmits(['close'])

const closeModal:any = () => {
  // document.getElementById('myoal').showModal()
  console.log('close modal')
  emits('close')
}

const contact:any = computed(() => {
    // console.log('courses', JSON.parse(JSON.stringify(store.getters.getEditcourse.value)))
    return store.getters.getEditIPODemo.value
})

// onMounted(async () => {
//     console.log('I am now here')
//     const request:any = `${api_url}api/course/get-courses/{pageIndex}/{pageSize}`;
//     await store.dispatch(actionTypes.FetchEditcourse, request)
// })

</script>

<template>
    <div class="h-[92vh]">
        <div class="main grid px-[45px]">
            <div class="grid">
                <div class="flex justify-between py-10 items-center ">
                    <p class="text-2xl">Details</p>
                    <SvgIcons name="cancel" @click="closeModal" class="cursor-pointer" />
                </div>
            </div>
            <!-- {{ contact }} hi -->
            <div class="bottom">
                <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                    <p>Name</p>
                    <p>{{ contact.contactName }}</p>
                </div>
                <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                    <p>Mobile</p>
                    <p>{{ contact.phoneNumber }}</p>
                </div>
                <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                    <p>Email</p>
                    <p>{{ contact.email }}</p>
                </div>
                <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                    <p>Date</p>
                    <p>{{ moment(contact.demoDate).format('MMM DD, YYYY hh:mm:ss A') }}</p>
                </div>
                <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                    <p>Company Name</p>
                    <p>{{ contact.companyName }}</p>
                </div>
                <div class="flex gap-5 py-3 text-xl font-medium justify-between items-start">
                    <p>Company Type</p>
                    <p>{{ contact.companyType == 0 ? 'Telecommunications' : contact.companyType == 1 ? 'IT' : contact.companyType == 2 ? 'Fast Moving Consumer Goods' : contact.companyType == 3 ? 'Finance' : contact.companyType == 4 ? 'Banking' : contact.companyType == 5 ? 'Health' : contact.companyType == 6 ? 'Insurance' : contact.companyType == 7 ? 'Transportation' : contact.companyType == 8 ? 'Logistics' : contact.companyType == 9 ? 'Oil and Gas' : contact.companyType == 10 ? 'HMO' : contact.companyType == 11 ? 'Real Estate' : contact.companyType == 12 ? 'Education' : contact.companyType == 13 ? 'Construction' : contact.companyType == 14 ? 'Pharmaceutical' : 'Others' }}</p>
                    <!-- <p class="min-w-2/3 text-base">
                    {{ contact.message }}
                    </p> -->
                </div>
            </div>
        </div>
    </div>
</template>
