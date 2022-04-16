<script lang="ts">
export default {
  name: 'ProjectDetails',
}
</script>

<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue';
import { api_url } from '../../../config'
import { ref, toRefs, computed, onMounted } from 'vue';
import { useStore } from 'vuex'
import moment from 'moment'
import Modal from '../../Modal.vue'
import * as actionTypes from '../../../store/module/services/constants/action'
import multiselect from '@vueform/multiselect'

const store = useStore();

const showProfilePicture = ref(false);
const emits = defineEmits(['close'])

const closeModal:any = () => {
  // document.getElementById('myoal').showModal()
  console.log('close modal')
  emits('close')
}

const projectDetails:any = computed(() => {
  return store.getters.getNewProject.value
})

// const projectDetails:any = computed(() => {
//     console.log('projects', JSON.parse(JSON.stringify(store.getters.getNewProject.value)))
//     return JSON.parse(JSON.stringify(store.getters.getNewproject.value))
// })

// onMounted(async () => {
//     console.log('I am now here')
//     const request:any = `${api_url}api/project/get-projects/{pageIndex}/{pageSize}`;
//     await store.dispatch(actionTypes.FetchEditproject, request)
// })

</script>

<template>
    <div class="main grid px-[45px] h-[90vh]">
        <div class="grid">
            <div class="flex justify-between py-[5px] items-center ">
                <p class="text-2xl">Project Details</p>
                <SvgIcons name="cancel" @click="closeModal" class="cursor-pointer" />
            </div>
        </div>
        <div class="bottom">
            <!-- {{ projectDetails }} -->
            <!-- {{ projectDetails.title }} -->
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Company name</p>
                <p>{{ projectDetails.companyName }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Title</p>
                <p>{{ projectDetails.title }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Start Date</p>
                <p class="text-justify flex justify-end w-2/3">{{ moment(projectDetails.startDate).format('dddd, MMMM D, YYYY') }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>End Date</p>
                <p class="text-justify flex justify-end w-2/3">{{ moment(projectDetails.endDate).format('dddd, MMMM D, YYYY') }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Email</p>
                <p>{{ projectDetails.email }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>No of resources</p>
                <p>{{ projectDetails.noOfResources }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Status</p>
                <p>{{ projectDetails.status == 0 ? 'Pending' : projectDetails.status == 1 ? 'Ongoing' : 'Ended' }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Project Brief</p>
                <p class=" ">{{ projectDetails.brief }}</p>
            </div>
        </div>
    </div>
</template>
