<script lang="ts">
export default {
  name: 'UpdateProjectStatus',
}
</script>

<script setup lang="ts">
import { computed, ref, onMounted, watch, reactive } from 'vue';
import { useStore } from 'vuex'
import SvgIcons from '../../SvgIcons.vue';
import Filter from '../../Filter.vue';
import * as actionTypes from '../../../store/module/services/constants/action'
import { api_url } from '../../../config'
import multiselect from '@vueform/multiselect'

const store:any = useStore()

let info:any = ref('Status')

let isChecked:any = ref(false);

const project:any = computed(() => {
  return JSON.parse(JSON.stringify(store.getters.getProject.value))
})

const check:any = ():any => {
    isChecked.value = !isChecked.value;
}

const projectId:any = ref('')

const student:any = computed(() => {
    console.log('students', JSON.parse(JSON.stringify(store.getters.getEditStudent.value)))
    return JSON.parse(JSON.stringify(store.getters.getEditStudent.value))
})

// const setProjectId:any = async (id:any, name:any) => {
//     console.log('projectid', id)
//     info.value = name
//     return projectId.value = id
// }

const addStudent:any = async () => {
    console.log('I will add student');
    // route.push('/dashboard/student-management')
    const data:any = {
        projectId: projectId.value,
        studentId: student.value.id,
    }
    const request:any = `${api_url}api/project/addstudent-toproject`;

    const requestData:any = {
        data: data,
        url: request,
    }

    console.log('requestData', requestData)
    store.dispatch(actionTypes.AddProject, requestData)
    closeModal()
}

// let isReady:any = computed(() => {
//     let answer:any
//     if (projectId.value !== '') {
//         answer = true
//     } else {
//         answer = false
//     }
//     return answer;
// })

const isReady:any = ref(false)

watch(
  () => projectId.value,
  (newprojectId, oldprojectId) => {
    // console.log('projectId', projectId.value)
    isReady.value = !isReady.value;
  },
);

let searchText:any = ref('');

// const filterproject:any = async (project_id:any) => {
//     console.log('i can get here')
//     console.log('project_id', project_id)
//     const request:any = `${api_url}api/project/get-project-students/${project_id}`;
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
    const request:any = `${api_url}api/project/get-projectes`;
    store.dispatch(actionTypes.FetchProject, request)
    store.getters.getProject.value
}

const activeView:any = 'bg-primary hover:opacity-80';
const disabledView:any = 'bg-gray-300';

onMounted(async() => {
    console.log('I started here');
    // const request:any = 'https://walurebackofficev1.azurewebsites.net/api/student/get-students/{pageIndex}/{pageSize}';
    const request:any = `${api_url}api/project/get-projectes`;
    await store.dispatch(actionTypes.FetchProject, request)
    // await store.getters.getEditStudent
    // console.log('student is', store.getters.getEditStudent.value)
    // console.log('I finished here');
})
</script>

<template>
    <div class="main relative w-full px-6 lg:px-[45px] h-screen bg-white">
        <div class="flex justify-between py-[53px] items-center ">
            <p class="text-2xl">Add to a project</p>
            <SvgIcons @click="closeModal" name="cancel" class="cursor-pointer" />
        </div>
        <form class="text-sm text-left grid">
            <div class="grid gap-1 mb-10">
                <label for="project" class="font-semibold">
                    Select from project available*
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
                            <ul class="overflow-auto" v-for="item in project" :key="item.id">
                                <li @click.prevent="setProjectId(item.id, item.projectName)" class="py-2 px-5 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">{{ item.projectName }}</li>
                            </ul>
                        </div>
                    </template>
                </Filter> -->
                <multiselect @clear="deselect" v-model="projectId" valueProp="id" :options="project" track-by="projectName" label="projectName" placeholder="Select option" :searchable="true" class="multiselect-blue" />
            </div>
            <div class="flex justify-end pb-10">
                <button type="button" @click.prevent="addStudent" :class="[ isReady ? activeView : disabledView ]" :disabled="!isReady" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Add</button>
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
