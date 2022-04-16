<script lang="ts">
export default {
  name: 'ConsultancyDetails',
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

const consultancyDetails:any = computed(() => {
  return store.getters.getEditConsultancy.value
})

// const consultancyDetails:any = computed(() => {
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
                <p class="text-2xl">Consultancy Details</p>
                <SvgIcons name="cancel" @click="closeModal" class="cursor-pointer" />
            </div>
        </div>
        <div class="bottom mb-72">
            <!-- {{ consultancyDetails }} -->
            <!-- {{ consultancyDetails.title }} -->
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Name</p>
                <p>{{ consultancyDetails.contactPerson }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Mobile number</p>
                <p>{{ consultancyDetails.phoneNumber }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Email</p>
                <p>{{ consultancyDetails.email }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Status</p>
                <p>{{ consultancyDetails.status == 0 ? 'Pending' : consultancyDetails.status == 1 ? 'Ongoing' : 'Ended' }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Message</p>
                <p class=" ">{{ consultancyDetails.message }}</p>
            </div>
        </div>
    </div>
</template>
