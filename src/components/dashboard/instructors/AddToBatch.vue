<script lang="ts">
export default {
  name: 'AddToBatch',
}
</script>

<script setup lang="ts">
import { computed, ref, onMounted, watch, reactive } from 'vue';
import { useStore } from 'vuex'
import SvgIcons from '../../SvgIcons.vue';
import Filter from '../../Filter.vue';
import * as actionTypes from '../../../store/module/batch/constants/action'
import { api_url } from '../../../config'
import multiselect from '@vueform/multiselect'

const store:any = useStore()

let info:any = ref('Status')

let isChecked:any = ref(false);

const batch:any = computed(() => {
  return JSON.parse(JSON.stringify(store.getters.getBatch.value))
})

const check:any = ():any => {
    isChecked.value = !isChecked.value;
}

const batchId:any = ref('')

const instructor:any = computed(() => {
    console.log('instructors', JSON.parse(JSON.stringify(store.getters.getEditInstructor.value)))
    return JSON.parse(JSON.stringify(store.getters.getEditInstructor.value))
})

// const setBatchId:any = async (id:any, name:any) => {
//     console.log('batchid', id)
//     info.value = name
//     return batchId.value = id
// }

const addInstructor:any = async () => {
    console.log('I will add instructor');
    // route.push('/dashboard/student-management')
    const data:any = {
        batch_Id: batchId.value,
        instructor_Id: instructor.value.id,
    }
    const request:any = `${api_url}api/batch/addinstructor-tobatch`;

    const requestData:any = {
        data: data,
        url: request,
    }

    console.log('requestData', requestData)
    await store.dispatch(actionTypes.AddInstructorToBatch, requestData)
    closeModal()
}

// let isReady:any = computed(() => {
//     let answer:any
//     if (batchId.value !== '') {
//         answer = true
//     } else {
//         answer = false
//     }
//     return answer;
// })

const isReady:any = ref(false)

watch(
  () => batchId.value,
  (newbatchId, oldbatchId) => {
    // console.log('batchId', batchId.value)
    isReady.value = !isReady.value;
  },
);

let searchText:any = ref('');

// const filterbatch:any = async (batch_id:any) => {
//     console.log('i can get here')
//     console.log('batch_id', batch_id)
//     const request:any = `${api_url}api/batch/get-batch-students/${batch_id}`;
// }

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
  emits('close')
}

const deselect:any = async () => {
    const request:any = `${api_url}api/batch/get-batches`;
    store.dispatch(actionTypes.FetchBatch, request)
    store.getters.getBatch.value
}

const activeView:any = 'bg-primary hover:opacity-80';
const disabledView:any = 'bg-gray-300';

onMounted(async() => {
    console.log('I started here');
    // const request:any = 'https://walurebackofficev1.azurewebsites.net/api/student/get-students/{pageIndex}/{pageSize}';
    const request:any = `${api_url}api/batch/get-batches`;
    await store.dispatch(actionTypes.FetchBatch, request)
    // await store.getters.getEditInstructor
    // console.log('student is', store.getters.getEditInstructor.value)
    // console.log('I finished here');
})
</script>

<template>
    <div class="main relative w-full px-6 lg:px-[45px] h-screen bg-white">
        <div class="flex justify-between py-[53px] items-center ">
            <p class="text-2xl">Add to a batch</p>
            <SvgIcons @click="closeModal" name="cancel" class="cursor-pointer" />
        </div>
        <form class="text-sm text-left grid">
            <div class="grid gap-1 mb-10">
                <!-- {{ batch }} -->
                <label for="batch" class="font-semibold">
                    Select from batch available*
                </label>
                <!-- <Filter>
                    <template #info>
                        <span class="px-5 lg:pr-56">{{ info }}</span>
                    </template>
                    <template #input>                        
                        <input @keyup.esc="close" @keyup="filter" v-model="searchText"  class="border-2 text-sm p-3 rounded h-10 w-full mx-auto">
                    </template>
                    <template #list>
                        <div id="students">
                            <ul class="overflow-auto" v-for="item in batch" :key="item.id">
                                <li @click.prevent="setBatchId(item.id, item.batchName)" class="py-2 px-5 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">{{ item.batchName }}</li>
                            </ul>
                        </div>
                    </template>
                </Filter> -->
                <multiselect @clear="deselect" v-model="batchId" valueProp="id" :options="batch" track-by="title" label="title" placeholder="Select option" :searchable="true" class="multiselect-blue" />
            </div>
            <div class="flex justify-end pb-10">
                <button type="button" @click.prevent="addInstructor" :class="[ isReady ? activeView : disabledView ]" :disabled="!isReady" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Add</button>
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
