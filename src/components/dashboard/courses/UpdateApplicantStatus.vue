<script lang="ts">
export default {
  name: 'UpdateApplicantStatus',
}
</script>

<script setup lang="ts">
import { computed, ref, onMounted, reactive } from 'vue';
import { useStore } from 'vuex'
import SvgIcons from '../../SvgIcons.vue';
import Filter from '../../Filter.vue';
import * as actionTypes from '../../../store/module/courses/constants/action'
import * as mutationTypes from '../../../store/module/courses/constants/mutation'
import { api_url } from '../../../config'
import multiselect from '@vueform/multiselect'

const store:any = useStore()

// let info:any = ref('Status')

let isChecked:any = ref(false);

const applicant:any = computed(() => {
  // console.log('applicants', JSON.parse(JSON.stringify(store.getters.getEditCourseApplicant.value)))
  return JSON.parse(JSON.stringify(store.getters.getEditCourseApplicant.value))
})

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

const check:any = ():any => {
    isChecked.value = !isChecked.value;
}

const applicantId:any = ref('')

// const student:any = computed(() => {
//     console.log('students', JSON.parse(JSON.stringify(store.getters.getEditStudent.value)))
//     return JSON.parse(JSON.stringify(store.getters.getEditStudent.value))
// })

// const setBatchId:any = async (id:any, name:any) => {
//     console.log('applicantid', id)
//     info.value = name
//     return applicantId.value = id
// }

const statusId:any = ref('')

const filterClicked = ref(false)

const multi:any = ref(null)

const deselect:any = async () => {
    // const request:any = `${api_url}api/courseapplicant/get-courseapplicant/{pageNumber}/{pageSize}`;
    // store.dispatch(actionTypes.FetchCourseApplicants, request)
    // store.getters.getCourseApplicants.value

    console.log('on deselect')
    // filterClicked.value = false;
    // const batchrequest:any = `${api_url}api/batch/get-batches`;
    // await store.dispatch(actionTypes.FetchCourseApplicants, batchrequest)  
}

const updateApplicantStatus:any = async () => {
    console.log('I will update applicant status');
    console.log('applicant id should be', applicant.value.id)
    console.log('status value should be', statusId.value)
    // route.push('/dashboard/student-management')
    const data:any = {
        applicantId: applicant.value,
    }
    const request:any = `${api_url}api/courseapplicant/updatestatus/${applicant.value.id}/${statusId.value}`;

    // const requestData:any = {
    //     data: data,
    //     url: request,
    // }

    console.log('requestData', request)
    await store.dispatch(actionTypes.UpdateApplicantStatus, request)
    closeModal()
}

let searchText:any = ref('');

const filter:any = async () => {
  const search:any = searchText.value.toLowerCase();
  console.log('search', search)
  const status:any = document.getElementById('students');
  console.log('status', status)
  const rows:any = status.getElementsByTagName('ul');
  console.log('rows', rows)
  console.log('rows length', rows.length)

  for (let i:any = 0; i < rows.length; i++) {
    const row:any = rows[i];
    console.log('row', rows[0])
    console.log('row', rows[1])
    console.log('row', rows[2])
    console.log('row', rows[0].textContent)
    console.log('row', rows[1].textContent)
    console.log('row', rows[2].textContent)
    if (
        row.textContent.toLowerCase().indexOf(search) > -1 
    ) {
        console.log('rowey', rows[i])
        rows[i].style.display = '';
    } else {
        console.log('roway', rows[i])
        rows[i].style.display = 'none';
    }
  }
}

const close:any = async () => {
  searchText.value = ''
}

const emits = defineEmits(['close']);

const closeModal:any = async () => {
  // multi.open()
  statusId.value = ''
  // store.commit(mutationTypes.SetNewInstructor, {})
  emits('close')
}

onMounted(async() => {
    console.log('I started here');
    // const request:any = 'https://walurebackofficev1.azurewebsites.net/api/student/get-students/{pageIndex}/{pageSize}';
    const request:any = `${api_url}api/applicant/get-applicantes/{pageIndex}/{pageSize}`;
    // await store.dispatch(a ctionTypes.FetchBatch, request)
    // await store.getters.getEditStudent
    // console.log('student is', store.getters.getEditStudent.value)
    // console.log('I finished here');
})
</script>

<template>
    <div class="main relative w-full px-6 lg:px-[45px] h-screen bg-white">
        <div class="flex justify-between py-[53px] items-center ">
            <p class="text-2xl">Update Applicant Status</p>
            <SvgIcons @click="closeModal" name="cancel" class="cursor-pointer" />
        </div>
        <form class="text-sm text-left grid">
            <div class="grid gap-1 mb-10">
                <label for="applicant" class="font-semibold">
                    Select Status*
                </label>
                <multiselect ref="multi" @clear="deselect" v-model="statusId" valueProp="value" :options="statusOptions" track-by="label" label="label" placeholder="Select option" :searchable="true" class="multiselect-blue" />
            </div>
            <div class="flex justify-end pb-10">
                <button @click.prevent="updateApplicantStatus" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Save Changes</button>
            </div>
        </form>
    </div>
</template>

<style>

.multiselect-blue {
  --ms-option-bg: #DBEAFE;
  --ms-option-color: #2563EB;
  --ms-bg: #FFFFFF;
}
</style>

<style>
.dp-custom-input {
    @apply py-[8px] rounded-md;
}
.multiselect-blue {
  /* --ms-option-bg: #DBEAFE; */
  --ms-option-color: hsla(var(--color-primary), var(--tw-bg-opacity));
  --ms-dropdown-bg: #FFFFFF;
  --ms-option-bg-selected: hsla(var(--color-primary), var(--tw-bg-opacity));
  --ms-tag-bg: hsla(var(--color-primary), var(--tw-bg-opacity));
  --ms-py: 8px;
  --ms-font-size: 12px;
  --ms-option-bg-selected: hsla(var(--color-primary), var(--tw-bg-opacity));
}
</style>

<style src="@vueform/multiselect/themes/default.css"></style>
