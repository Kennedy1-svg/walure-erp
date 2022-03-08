<script lang="ts">
export default {
  name: 'AddToBatch',
}
</script>

<script setup lang="ts">
import { computed, ref, onMounted, reactive } from 'vue';
import { useStore } from 'vuex'
import SvgIcons from '../../SvgIcons.vue';
import Filter from '../../Filter.vue';
import * as actionTypes from '../../../store/module/batch/constants/action'
import { api_url } from '../../../config'

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

const student:any = computed(() => {
    console.log('students', JSON.parse(JSON.stringify(store.getters.getEditStudent.value)))
    return JSON.parse(JSON.stringify(store.getters.getEditStudent.value))
})

const setBatchId:any = async (id:any, name:any) => {
    console.log('batchid', id)
    info.value = name
    return batchId.value = id
}

const addStudent:any = async () => {
    console.log('I will add student');
    // route.push('/dashboard/student-management')
    const data:any = {
        batchId: batchId.value,
        studentId: student.value.id,
    }
    const request:any = `${api_url}api/batch/addstudent-tobatch`;

    const requestData:any = {
        data: data,
        url: request,
    }

    console.log('requestData', requestData)
    store.dispatch(actionTypes.AddStudentToBatch, requestData)
}

let searchText:any = ref('');

const filter:any = async () => {
  const search:any = searchText.value.toLowerCase();
  console.log('search', search)
  const status:any = document.getElementById('addToBatchstatus');
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

onMounted(async() => {
    console.log('I started here');
    // const request:any = 'https://walurebackofficev1.azurewebsites.net/api/student/get-students/{pageIndex}/{pageSize}';
    const request:any = `${api_url}api/batch/get-batches/{pageIndex}/{pageSize}`;
    await store.dispatch(actionTypes.FetchBatch, request)
    // await store.getters.getEditStudent
    // console.log('student is', store.getters.getEditStudent.value)
    // console.log('I finished here');
})
</script>

<template>
    <div class="main w-full px-6 lg:px-[45px] h-screen bg-white">
        <div class="flex justify-between py-[53px] items-center ">
            <p class="text-2xl">Add to a batch</p>
            <!-- <SvgIcons onclick="document.getElementById('myModal').close();" name="cancel" class="cursor-pointer" /> -->
        </div>
        <form class="text-sm text-left grid">
            <div class="grid gap-1 mb-10">
                <label for="batch" class="font-semibold">
                    Select from batch available*
                </label>
                <Filter>
                    <template #info>
                        <span class="px-5 lg:pr-56">{{ info }}</span>
                    </template>
                    <template #input>                        
                        <input @keyup.esc="close" @keyup="filter" v-model="searchText"  class="border-2 text-sm p-3 rounded h-10 w-full mx-auto">
                    </template>
                    <template #list>
                        <div id="addToBatchstatus">
                            <ul class="overflow-auto" v-for="item in batch" :key="item.id">
                                <li @click.prevent="setBatchId(item.id, item.batchName)" class="py-2 px-5 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">{{ item.batchName }}</li>
                            </ul>
                        </div>
                    </template>
                </Filter>
            </div>
            <div class="flex justify-end pb-10">
                <button @click.prevent="addStudent" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Add</button>
            </div>
        </form>
    </div>
</template>
