<script lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'

export default {
    name: 'EmployeeDataHeader',
}
</script>

<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue';
import Search from '../../Search.vue';
import useClipboard from 'vue-clipboard3'
import AddEmployeeBiodata from './AddEmployeeBiodata.vue'
import Filter from '../../Filter.vue';
import Modal from '../../Modal.vue';
import alert from '../../alerts.vue';
import { api_url } from '../../../config/index'
import multiselect from '@vueform/multiselect'
import * as actionTypes from '../../../store/module/instructors/constants/action';
import * as mutationTypes from '../../../store/module/instructors/constants/mutation';
import * as courseActionTypes from '../../../store/module/courses/constants/action';


const store = useStore();
const { toClipboard } = useClipboard();

const closeModal:any = () => {
  // document.getElementById('addinstructor').showModal()
  console.log('close student modal')
  // store.commit(mutationTypes.SetNewHR, {})
  let doc:any = document.getElementById('addinstructor')
  doc.close()
}

let isSearching:any = ref(false)
const statusField:any = ref('')

const statusoptions:any = [
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
  }
]

const deselect:any = async () => {
    // const request:any = `${api_url}api/student/get-students/{pageIndex}/{pageSize}`;
    // store.dispatch(actionTypes.FetchHRs)
    // store.getters.getStudents
}

let searchText:any = ref('');

const filter:any = async () => {
    isSearching.value = true
  const search:any = searchText.value.toLowerCase();
  console.log('search', search)
  const request:any = `${api_url}api/instructor/search-instructor/{pageIndex}/{pageSize}/${search}`;
  // await store.dispatch(actionTypes.FetchHRs, request)
  // store.getters.getStudents

  // const status:any = document.getElementById('status');
  // console.log('status', status)
  // const rows:any = status.getElementsByTagName('ul');
  // console.log('rows', rows)
  // console.log('rows length', rows.length)

  // for (let i:any = 0; i < rows.length; i++) {
  //   const row:any = rows[i];
  //   console.log('row', rows[0])
  //   console.log('row', rows[1])
  //   console.log('row', rows[2])
  //   console.log('row', rows[0].textContent)
  //   console.log('row', rows[1].textContent)
  //   console.log('row', rows[2].textContent)
  //   if (
  //     row.textContent.toLowerCase().indexOf(search) > -1
  //   ) {
  //     rows[i].style.display = '';
  //   } else {
  //     rows[i].style.display = 'none';
  //   }
  // }
}

let alertState:any = ref(false);

const copy:any = async () => {
  console.log('copying')
  console.log(`the alert state is ${alertState.value} `)
  console.log('copying')
  alertState.value = !alertState.value;
  console.log(`the alert state is ${alertState.value} `)
  try {
    await toClipboard('https://localhost:3000/fill-employee-biodata')
    console.log('Copied to clipboard')
  } catch (e) {
    console.error(e)
  }
  setTimeout(() => {
    alertState.value = !alertState.value;
  }, 1700);
}

const close:any = async () => {
    isSearching.value = false
  searchText.value = ''
  // const request:any = `${api_url}api/instructor/get-instructors/{pageIndex}/{pageSize}`;
  // await store.dispatch(actionTypes.FetchHRs)
}

const cancan:any = async (name:any) => {
  console.log('i can can')
  console.log('name', name)
  // if (name == 'All') {
  //   const request:any = `${api_url}api/student/get-students/{pageIndex}/{pageSize}`;
  //   store.dispatch(actionTypes.FetchStudents, request)
  //   store.getters.getStudents
  //   // console.log('all url', url)
  //   return info.value = 'Status'
  // } else if (name == 'Active') {
    const request:any = `${api_url}api/instructor/filter-instructors/{pageIndex}/{pageSize}/${name}`;
    // await store.dispatch(actionTypes.FetchHRs, request)
  //   // store.dispatch(actionTypes.FilterStudent, `${url}filter-students/1/10/1`)
  //   store.getters.getStudents
  //   // console.log('active url', url)
  //   return info.value = name
  // } else if (name == 'Disabled') {
  //   const request:any = `${api_url}api/student/filter-students/{pageIndex}/{pageSize}/0`;
  //   store.dispatch(actionTypes.FilterStudent, request)
  //   store.getters.getStudents
  //   // console.log('disabled url', url)
  //   return info.value = name
  // }
}

onMounted( async () => {
    // store.commit('setPageTitle', 'HR List');
    console.log('EmployeeDataHeader mounted');
    const request:any = `${api_url}api/course/get-courses`;
    // await store.dispatch(courseActionTypes.FetchCourses, request)
});

</script>

<template>
  <div class="main pt-[50px] grid gap-5 pb-[90px]">
    <alert :class="[alertState ? '' : 'hidden']" class="absolute top-28 bg-white p-2 right-10" name="result">
        <template #icon>
            <p class="bg-green-accent rounded-full border p-2">
                <SvgIcons class="text-white" name="tick" />
            </p>
        </template>
        <template #info>
            <p class="text-sm text-black">
                Copied!
            </p>
        </template>
    </alert>
    <div class="top flex justify-between items-center">
        <h1 class="font-semibold text-2xl">Employee Data</h1>
        <button class="focus:outline-none flex items-center gap-3 text-sm">
          <p class="text-grey font-semibold">Add Employee</p>
          <div class="relative overflow-hdden">
            <section class="flex h-full items-start">
              <div onclick="document.getElementById('addinstructor').showModal()" id="btn">
                <span class="bg-blue p-1 flex justify-center text-white rounded-md">
                  <SvgIcons name="plus" /> <!-- plus icon -->
                </span>
              </div>
            </section>

            <dialog id="addinstructor" class="h-auto w-11/12 md:w-4/5 p-5 bg-white rounded-md ">
              <div class="w-full h-auto">
                <!-- Modal Content-->
                  <AddEmployeeBiodata @close="closeModal" />
                <!-- End of Modal Content-->
              </div>
            </dialog>
          </div>
        </button>
    </div>
    <div class="filter flex bg-white rounded-t-lg justify-around gap-x5 items-center px-11 py-5">
      <div class="status w-1/3 mr-4">
        <multiselect @select="cancan(statusField)" @clear="deselect" v-model="statusField" valueProp="value" :options="statusoptions" track-by="label" label="label" placeholder="Status" :searchable="true" class="multiselect-blue" />
      </div>
      <div class="search">
        <Search>
          <template #input>
            <input class="rounded text-sm p-1 focus:outline-none" @keyup.esc="close" v-model="searchText" type="text" placeholder="Search">
            <span class="w-auto flex justify-end items-center text-grey px-2">
              <SvgIcons v-if="!isSearching" name="search" @click="filter"  />
              <SvgIcons v-else name="o-cancel" @click="close" class="transform scale-75" />
            </span>
          </template>
        </Search>
      </div>
      <div class="link w-1/3 text-[#8692A6] py-[5px] px-[15px] bg-[#EFF0F6] rounded grid">
        <div>
          <p class="flex gap-2 items-center text-[8px] font-semibold">Copy Link
          </p>
        </div>
        <div class="flex justify-between items-baseline">
          <p class="text-[10px] leading-[12px]">walure/fill-employee-biodata</p>
          <SvgIcons name="copy" @click="copy" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

  dialog[open] {
    position: absolute !important;
    right: -19%;
    animation: appear .25s cubic-bezier(0.0, 0.0, 0.58, 1.0);
}

  dialog::backdrop {
    background: linear-gradient(45deg, rgba(0, 0, 0, 0.5), rgba(54, 54, 54, 0.5));
    backdrop-filter: blur(3px);
  }


@keyframes appear {
  from {
    opacity: 0;
    transform: translateX(-40rem);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

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
}
</style>

<style src="@vueform/multiselect/themes/default.css"></style>