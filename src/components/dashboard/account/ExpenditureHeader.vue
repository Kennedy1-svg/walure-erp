<script lang="ts">
export default {
  name: 'ExpenditureHeader',
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import SvgIcons from '../../SvgIcons.vue';
import Search from '../../Search.vue';
import Filter from '../../Filter.vue';
import Modal from '../../Modal.vue';
import AddExpenditure from './AddExpenditure.vue';
import { useStore } from 'vuex';
import moment from 'moment';
import { downloadData } from '../../../helpers/api';
import alert from '../../alerts.vue';
import spinner from '../../spinner.vue';
// import multiselect from 'vue-multiselect';
import multiselect from '@vueform/multiselect'
import * as accountActionTypes from '../../../store/module/account/constants/action';
import { account_api_url } from '../../../config/index'
import { FetchExpenditure } from '../../../store/module/account/constants/action';

const store = useStore();
const startDate:any = ref('');
const endDate:any = ref('');

let searchText:any = ref('');

const status:any = ref(true);
let alertText:any = ref('Downloading...');
const today:any = moment().add(1, 'days').format('YYYY-MM-DD');
let isDisabled = ref(false);

const filterClicked = ref(false)

let isSearching:any = ref(false)

const categories:any = computed(() => {
    return store.getters.getCategoryList.value.payload;
})

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
    label: 'Completed',
    value: 2
  }
]

const courseField:any = ref('');

const categoryField:any = ref('')

const filter:any = async () => {
    isSearching.value = true
    const search:any = searchText.value.toLowerCase();
    console.log('search', search)
  // const expenditure:any = document.getElementById('course');
  // const rows:any = expenditure.getElementsByTagName('ul');

  // for (let i:any = 0; i < rows.length; i++) {
  //   const row:any = rows[i];

  //   if (row.textContent.toLowerCase().indexOf(search) > -1) {
  //     rows[i].style.display = '';
  //   } else {
  //     rows[i].style.display = 'none';
  //   }
  // }
  const request:any = `${account_api_url}api/expenditure/getall-expenditure?keyword=${search}`;
  await store.dispatch(accountActionTypes.FetchExpenditure, request)
}

const filtercourse:any = async () => {
  console.log('i am here')
}

const filterAllExpenditure:any = async () => {
  console.log('let us filter')
  console.log('course id', courseField.value)
  filterClicked.value = true;
  // if (courseField.value) {
  //   const request:any = `${account_api_url}api/expenditure/filter-expenditureCourse/{pageNumber}/{pageSize}/${courseField.value}`;
  //   store.dispatch(accountActionTypes.FetchExpenditure, request)
  // } else

  if (categoryField.value) {
    const request:any = `${account_api_url}api/expenditure/getall-expenditure?categoryId=${categoryField.value}`;
    store.dispatch(accountActionTypes.FetchExpenditure, request)
  } else if (startDate.value && endDate.value) {
    console.log('date filter', startDate.value, endDate.value)
    let start:any = moment(startDate.value).format('DD-MM-YYYY');
    let end:any = moment(endDate.value).format('DD-MM-YYYY');
    console.log('date filter formatted', start, end)
    const request:any = `${account_api_url}api/expenditure/getall-expenditure?startDate=${start}&endDate=${end}`;
    console.log('request', request)
    store.dispatch(accountActionTypes.FetchExpenditure, request)
  } else if (startDate.value && endDate.value && categoryField.value) {
    console.log('date filter', startDate.value, endDate.value)
    let start:any = moment(startDate.value).format('DD-MM-YYYY');
    let end:any = moment(endDate.value).format('DD-MM-YYYY');
    console.log('date filter formatted', start, end)
    const request:any = `${account_api_url}api/expenditure/getall-expenditure?categoryId=${categoryField.value}&startDate=${start}&endDate=${end}`;
    console.log('request', request)
    store.dispatch(accountActionTypes.FetchRevenue, request)
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
    categoryField.value = ''
    startDate.value = ''
    endDate.value = ''
    // const expenditurerequest:any = `${account_api_url}api/expenditure/get-expenditurees`;
    await store.dispatch(accountActionTypes.FetchExpenditure)
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
  // const request:any = `${account_api_url}api/expenditure/getall-expenditures/{pageIndex}/{pageSize}`;
    await store.dispatch(accountActionTypes.FetchExpenditure)
}

const closeModal:any = () => {
  // document.getElementById('addstudent').showModal()
  console.log('close expenditure modal')
  let doc:any = document.getElementById('addexpenditure')
  doc.close()
}

const exportAll:any = async () => {
  isDisabled.value = true;
  const url:any = `${account_api_url}/api/expenditure/download-all-expenditure`;
  const title:any = 'Expenditure Report';
  const token:any = localStorage.getItem('token')
  const format:any = '.xls'
  const response:any = await downloadData(title, url, format, token);
  response?.status == 200 ? '' : 'Error downloading';
  response?.status == 200 ? status.value = true : status.value = false;
  setTimeout(() => {
    isDisabled.value = false;
  }, 1500);
  console.log(`response is: ${response}`)
}

let isActive:any = computed(() => {
    if (courseField.value || categoryField.value || categoryField.value == '0' || (startDate.value && endDate.value)) {
        return true
    } else {
        return false
    }
})

const activeView:any = 'bg-primary text-white hover:opacity-80';
const disabledView:any = 'bg-gray-300';

onMounted( async() => {
    console.log('onMounted')
    const request:any = `${account_api_url}api/expenditurecategory/getlist-category`;
    console.log('url', request)
    await store.dispatch(accountActionTypes.FetchCategoryList, request)
})

</script>

<template>
  <div class="main w-full grid bg-white">
    <alert :class="[isDisabled ? '' : 'hidden']"  class="fixed z-60 top-40 bg-white p-2 right-0" name="result">
      <template #icon>
        <p v-if="status" class="bg-green-accent rounded-full border p-2">
          <SvgIcons class="text-white" name="tick" />
        </p>
        <p v-else class="">
          <SvgIcons class="text-red" name="exclamation" />
        </p>
      </template>
      <template #info>
        <p class="text-sm">
            {{ alertText }}
        </p>
      </template>
      <template #button></template>
    </alert>
    <div class="filter py-5 px-8">
      <div class="filter-items text-grey grid grid-cols-2 xl:grid-cols-4 gap-7 xl:gap-3 2xl:gap-10 py-5">
        <div class="startdate">
          <Datepicker inputClassName="dp-custom-input" v-model="startDate" :maxDate="endDate || today" placeholder="Start Date" :format="format" textInput autoApply/>
        </div>
        <div class="enddate">
          <Datepicker inputClassName="dp-custom-input" v-model="endDate" :minDate="startDate" :maxDate="today" :format="format" placeholder="End Date" autoApply/>
        </div>
        <div class="status">
          <multiselect v-model="categoryField" @clear="deselect" @select="cancan" valueProp="id" :options="categories" track-by="name" label="name" placeholder="Category" :searchable="true" class="multiselect-blue" />
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
          <button @click="filterAllExpenditure" class="py-4 px-10 hover:shadow rounded border" :class="[isActive ? activeView : disabledView]" :disabled = !isActive>
            Apply Filter
          </button>
          <button @click="deselect" class="text-3xl" :class="[filterClicked ? 'flex' : 'hidden']">
            <SvgIcons name="refresh" />
          </button>
        </div>
        <div class="status flex gap-7 items-center">
          <button @click="exportAll" :disabled="isDisabled" :class="[isDisabled ? 'border-grey text-grey' : 'border-primary text-primary']" class="flex gap-2 py-4 px-10 text-primary hover:shadow rounded border border-primary bg-transparent">
            <span class="px-2" :class="[isDisabled ? '' : 'hidden']">
                <spinner class="border-grey" />
            </span>
            <SvgIcons name="export" class="text-2xl" />
            Export
          </button>
          <button class="focus:outline-none flex items-center gap-3">
            <div class="relative overflow-hdden">
              <section class="flex h-full justify-ceter items-start">
                <div onclick="document.getElementById('addexpenditure').showModal()" id="btn" class="py-4 bg-primary text-white px-7 rounded">
                  Add Expenditure
                </div>
              </section>

              <dialog id="addexpenditure" class="h-auto w-11/12 md:w-1/2 p-5 bg-white rounded-md ">
                <div class="w-full h-auto">
                  <!-- Modal Content-->
                    <AddExpenditure name="Add" @close="closeModal" />
                  <!-- End of Modal Content-->
                </div>
              </dialog>
            </div>
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

<style scoped>
.dp-custom-input {
    @apply py-[8px] rounded-md;
}
.multiselect-blue {
  /* --ms-option-bg: #DBEAFE; */
  --ms-option-color: hsla(var(--color-primary), var(--tw-bg-opacity));
  --ms-dropdown-bg: #FFFFFF;
  --ms-option-bg-selected: hsla(var(--color-primary), var(--tw-bg-opacity));
  --ms-tag-bg: hsla(var(--color-primary), var(--tw-bg-opacity));
  --ms-py: 10px;
  --ms-font-size: 14px;
}
</style>

<style src="@vueform/multiselect/themes/default.css"></style>