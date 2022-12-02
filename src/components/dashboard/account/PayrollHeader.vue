<script lang="ts">
export default {
  name: 'PayrollHeader',
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css'
import SvgIcons from '../../SvgIcons.vue';
import Search from '../../Search.vue';
import Filter from '../../Filter.vue';
import Modal from '../../Modal.vue';
// import AddIncomeStatement from './AddIncomeStatement.vue';
import { useStore } from 'vuex';
import moment from 'moment';
// import multiselect from 'vue-multiselect';
import multiselect from '@vueform/multiselect'
import * as courseActionTypes from '../../../store/module/courses/constants/action';
import * as projectActionTypes from '../../../store/module/services/constants/action';
import { api_url } from '../../../config/index'

const store = useStore();
const startDate:any = ref('');
const endDate:any = ref('');

let searchText:any = ref('');

let courseInfo:any = ref('Course')

let isSearching:any = ref(false)
const filterClicked = ref(false)


const courses:any = computed(() => {
  return store.getters.getCourses.value.payload;
});

const statusoptions:any = [
  {
    label: 'Pending',
    value: 0
  },
  {
    label: 'Ongoing',
    value: 1
  },
  {
    label: 'Ended',
    value: 2
  }
]

const courseField:any = ref('');

const statusField:any = ref('')

const filter:any = async () => {
    isSearching.value = true
  const search:any = searchText.value.toLowerCase();
  console.log('search', search)
  const request:any = `${api_url}api/project/search-projects/{pageIndex}/{pageSize}/${search}`;
  await store.dispatch(projectActionTypes.FetchProject, request)
  // const project:any = document.getElementById('projectlist');
  // const rows:any = project.getElementsByTagName('tr');

  // for (let i:any = 0; i < rows.length; i++) {
  //   const firstCol:any = rows[i].getElementsByTagName('td')[1];
  //   const secondCol:any = rows[i].getElementsByTagName('td')[2];
  //   const thirdCol:any = rows[i].getElementsByTagName('td')[3];
  //   const fourthCol:any = rows[i].getElementsByTagName('td')[6];
  //   const fifthCol:any = rows[i].getElementsByTagName('td')[7];

  //   if (
  //     firstCol.innerText.toLowerCase().indexOf(search) > -1 ||
  //     secondCol.innerText.toLowerCase().indexOf(search) > -1 ||
  //     thirdCol.innerText.toLowerCase().indexOf(search) > -1 ||
  //     fourthCol.innerText.toLowerCase().indexOf(search) > -1 || fifthCol.innerText.toLowerCase().indexOf(search) > -1
  //   ) {
  //     rows[i].style.display = '';
  //   } else {
  //     rows[i].style.display = 'none';
  //   }
  // }

}

const filterCourse:any = async () => {
  const search:any = searchText.value.toLowerCase();
  const project:any = document.getElementById('course');
  const rows:any = project.getElementsByTagName('ul');

  for (let i:any = 0; i < rows.length; i++) {
    const row:any = rows[i];

    if (row.textContent.toLowerCase().indexOf(search) > -1) {
      rows[i].style.display = '';
    } else {
      rows[i].style.display = 'none';
    }
  }
}

const filtercourse:any = async () => {
  console.log('i am here')
}

const filterAllProject:any = async () => {
  console.log('let us filter')
  console.log('course id', courseField.value)
  filterClicked.value = true;
  if (statusField.value || statusField.value == '0') {
    const request:any = `${api_url}api/project/filter-projects/{pageNumber}/{pageSize}/${statusField.value}`;
    store.dispatch(projectActionTypes.FetchProject, request)
  } else if (startDate.value && endDate.value) {
    console.log('date filter', startDate.value, endDate.value)
    let start:any = moment(startDate.value).format('MM/DD/YYYY');
    let end:any = moment(endDate.value).format('MM/DD/YYYY');
    console.log('date filter formatted', start, end)
    const request:any = `${api_url}api/project/filter-projectbydate/{pageNumber}/{pageSize}?startDate=${start}&endDate=${end}`;
    console.log('request', request)
    store.dispatch(projectActionTypes.FetchProject, request)
  } else {
    return
  }
}

const cancan:any = async () => {
  console.log('i can can')
}

const deselect:any = async () => {
    console.log('on deselect')
    filterClicked.value = false;
    const projectrequest:any = `${api_url}api/project/get-projects`;
    await store.dispatch(projectActionTypes.FetchProject, projectrequest)
}

const format:any = (date:any) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
}

const close:any = async () => {
    isSearching.value = false
  searchText.value = ''
  await store.dispatch(projectActionTypes.FetchProject)
}

const closeModal:any = () => {
  // document.getElementById('addstudent').showModal()
  console.log('close project modal')
  let doc:any = document.getElementById('addProject')
  doc.close()
}

let isActive:any = computed(() => {
    if (courseField.value || statusField.value || statusField.value == '0' || (startDate.value && endDate.value)) {
        return true
    } else {
        return false
    }
})

const activeView:any = 'bg-primary text-white hover:opacity-80';
const disabledView:any = 'bg-gray-300';

onMounted( async() => {
    console.log('onMounted')
    const courserequest:any = `${api_url}api/course/get-courses`;
    await store.dispatch(courseActionTypes.FetchCourses, courserequest)
})

</script>

<template>
    <div class="main pt-[50px] grid gap-5 pb-[90px]">
      <div class="top flex justify-between items-center">
        <h1 class="font-semibold text-2xl">Payroll</h1>
      </div>
        <div class="filter py-5 px-8 bg-white">
          <div class="filter-items text-grey grid grid-cols-1 xl:grid-cols-3 gap-7 xl:gap-10 2xl:gap-16 py-5">
            <div class="startdate">
              <Datepicker inputClassName="dp-custom-input" v-model="startDate" :maxDate="endDate" placeholder="From" :format="format" textInput/>
            </div>
            <div class="enddate">
              <Datepicker inputClassName="dp-custom-input" v-model="endDate" :minDate="startDate" :format="format" placeholder="To"  />
            </div>
            <div class="courses">
              <div class="search grid justify-self-end">
                <Search>
                  <template #input>
                    <input @keyup.esc="close" v-model="searchText" class="rounded text-sm p-1 focus:outline-none w-[350px] xl:w-full" type="text" placeholder="Search">
                    <span class="flex justify-end items-center text-grey">
                        <!-- <SvgIcons name="search" @click="filter"  /> -->
                        <SvgIcons v-if="!isSearching" name="search" @click="filter"  />
                        <SvgIcons v-else name="o-cancel" @click="close" class="transform scale-75" />
                    </span>
                  </template>
                </Search>
              </div>
            </div>
          </div>
          <div class="search-items flex justify-between items-center px11 py-5">
            <div class="status flex gap-4 items-center">
              <button @click="filterAllProject" class="py-4 px-10 hover:shadow rounded border" :class="[isActive ? activeView : disabledView]" :disabled = !isActive>
                Apply Filter
              </button>
              <button @click="deselect" class="text-3xl" :class="[filterClicked ? 'flex' : 'hidden']">
                <SvgIcons name="refresh" />
              </button>
            </div>
            <div class="status flex items-center">
              <button @click="filterAllProject" class="flex gap-2 py-4 px-10 text-primary hover:shadow rounded border border-primary bg-transparent">
                <SvgIcons name="export" class="text-2xl" />
                Export
              </button>
            </div>
          </div>
        </div>
    </div>
</template>

<style scoped>

  dialog[open] {
    position: absolute !important;
    right: -48%;
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
  --ms-py: 12px;
  --ms-font-size: 12px;
}
</style>

<style src="@vueform/multiselect/themes/default.css"></style>