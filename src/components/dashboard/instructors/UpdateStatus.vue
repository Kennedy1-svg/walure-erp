<script lang="ts">
export default {
  name: 'UpdateStatus',
}
</script>

<script setup lang="ts">
import { computed, ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import SvgIcons from '../../SvgIcons.vue';
import Filter from '../../Filter.vue';
import * as actionTypes from '../../../store/module/instructors/constants/action'
import { api_url } from '../../../config'
import multiselect from '@vueform/multiselect'

const store:any = useStore()

const route = useRouter()

let isChecked:any = ref(false);

const statusId:any = ref('');

const instructor:any = computed(() => {
  // console.log('instructors', JSON.parse(JSON.stringify(store.getters.getEditCourseApplicant.value)))
  return JSON.parse(JSON.stringify(store.getters.getEditInstructor.value))
})

const updateInstructorStatus:any = async () => {
    console.log('I will update instructor status');
    console.log('instructor id should be', instructor.value.id)
    console.log('status value should be', statusId.value)
    // route.push('/dashboard/student-management')
    const data:any = {
        instructorId: instructor.value,
    }
    const request:any = `${api_url}api/instructor/updateStatus/${instructor.value.id}/${statusId.value}`;

    // const requestData:any = {
    //     data: data,
    //     url: request,
    // }

    console.log('requestData', request)
    
    await store.dispatch(actionTypes.UpdateInstructorStatus, request)
    closeModal()
}

const check:any = ():any => {
    isChecked.value = !isChecked.value;
}

const emits = defineEmits(['close']);

const closeModal:any = async () => {
  statusId.value = ''
  emits('close')
}

const statusOptions:any = [
  {
    label: 'Pending',
    value: 0
  },
  {
    label: 'Approved',
    value: 1
  },
  {
    label: 'Rejected',
    value: 2
  }]

const addStudent:any = () => {
    // console.log('hi');
    // route.push('/dashboard/student-management')
}
</script>

<template>
    <div class="main w-full mt-[0.5px] px-[45px] h-screen bg-white">
        <div class="flex justify-between py-[53px] items-center ">
            <p class="text-2xl">Update Status</p>
            <SvgIcons onclick="document.getElementById('myModal').close();" name="cancel" @click="closeModal" class="cursor-pointer" />
        </div>
        <form class="text-sm grid">
            <div class="grid gap-1 mb-10">
                <label for="batch" class="font-semibold">
                    Select status*
                </label>
                <!-- <Filter>
                    <template #info>
                        <span class="pl-5 pr-56">
                            <p class="text-grey">
                                Select option
                            </p>
                        </span>
                    </template>
                    <template #input>
                        <input class="border-2 text-sm p-3 rounded h-7 w-full mx-auto">
                    </template>
                    <template #list>
                        <li><p class="py-2 px-5 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">
                           Pending
                        </p></li>
                        <li><p class="py-2 px-5 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">Approved</p></li>
                        <li><p class="py-2 px-5 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">Rejected</p></li>
                    </template>
                </Filter> -->
                <multiselect v-model="statusId" valueProp="value" :options="statusOptions" track-by="label" label="label" placeholder="Select option" :searchable="true" class="multiselect-blue" />
            </div>
            <div class="flex justify-end pb-10">
                <button @click.prevent="updateInstructorStatus" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Save Changes</button>
            </div>
        </form>
    </div>
</template>
