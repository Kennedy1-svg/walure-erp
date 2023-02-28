<script lang="ts">
export default {
//   name: 'LeaveManagementDetails',
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
    // return store.getters.getEditLeaveManagement.value
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
                    <p>Employee name</p>
                    <!-- <p>{{ contact.contactName }}</p> -->
                </div>
                <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                    <p>Email</p>
                    <!-- <p>{{ contact.phoneNumber }}</p> -->
                </div>
                <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                    <p>Phone number</p>
                    <!-- <p>{{ contact.email }}</p> -->
                </div>
                <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                    <p>Leave type</p>
                    <!-- <p>{{ moment(contact.demoDate).format('MMM DD, YYYY hh:mm:ss A') }}</p> -->
                </div>
                <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                    <p>Start date</p>
                    <!-- <p>{{ moment(contact.demoDate).format('MMM DD, YYYY hh:mm:ss A') }}</p> -->
                </div>
                <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                    <p>End date</p>
                    <!-- <p>{{ moment(contact.demoDate).format('MMM DD, YYYY hh:mm:ss A') }}</p> -->
                </div>
                <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                    <p>Resumption date</p>
                    <!-- <p>{{ moment(contact.demoDate).format('MMM DD, YYYY hh:mm:ss A') }}</p> -->
                </div>
                <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                    <p>Name of relief</p>
                    <!-- <p>{{ contact.companyName }}</p> -->
                </div>
            </div>
        </div>
    </div>
</template>
