<script lang="ts">
export default {
  name: 'BatchHeader',
}
</script>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css'
import SvgIcons from '../../SvgIcons.vue';
import Search from '../../Search.vue';
import Filter from '../../Filter.vue';
import Modal from '../../Modal.vue';
import AddBatch from './AddBatch.vue';
import { useStore } from 'vuex'

const store = useStore();
const startDate:any = ref('');
const endDate:any = ref('');

let searchText:any = ref('');

const filter:any = async () => {
  const search:any = searchText.value.toLowerCase();
  const batch:any = document.getElementById('batchlist');
  const rows:any = batch.getElementsByTagName('tr');

  for (let i:any = 0; i < rows.length; i++) {
    const firstCol:any = rows[i].getElementsByTagName('td')[1];
    const secondCol:any = rows[i].getElementsByTagName('td')[2];
    const thirdCol:any = rows[i].getElementsByTagName('td')[3];
    const fourthCol:any = rows[i].getElementsByTagName('td')[6];
    const fifthCol:any = rows[i].getElementsByTagName('td')[7];

    if (
      firstCol.innerText.toLowerCase().indexOf(search) > -1 ||
      secondCol.innerText.toLowerCase().indexOf(search) > -1 ||
      thirdCol.innerText.toLowerCase().indexOf(search) > -1 ||
      fourthCol.innerText.toLowerCase().indexOf(search) > -1 || fifthCol.innerText.toLowerCase().indexOf(search) > -1
    ) {
      rows[i].style.display = '';
    } else {
      rows[i].style.display = 'none';
    }
  }
}

const format:any = (date:any) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
}

const close:any = async () => {
  searchText.value = ''
}

</script>

<template>
    <div class="main pt-[50px] grid gap-5 pb-[90px]">
        <div class="top flex justify-between items-center">
            <h1 class="font-semibold text-2xl">Batch</h1>
            <button class="focus:outline-none flex items-center gap-3 text-sm">
                <p class="text-grey font-semibold">Add Batch</p>
                <div class="relative overflow-hdden">
                    <section class="flex h-full justify-ceter items-start">
                        <div onclick="document.getElementById('myl').showModal()" id="btn">
                            <span class="bg-blue p-1 flex justify-center text-white rounded-md">
                                <SvgIcons name="plus" /> <!-- plus icon -->
                            </span>
                        </div>
                    </section>

                    <dialog id="myl" class="h-auto w-11/12 md:w-1/2 p-5 bg-white rounded-md ">            
                        <div class="w-full h-auto">
                            <!-- Modal Content-->
                                <AddBatch />
                            <!-- End of Modal Content-->
                        </div>
                    </dialog>
                </div>
            </button>
        </div>
        <div class="filter bg-white rounded-t-lg justify-between items-center py-5">
            <div class="filter-items text-grey grid grid-cols-4 gap-3 bg-white rounded-t-lg px-11 py-5">
                <div class="startdate">
                    <Datepicker inputClassName="dp-custom-input" v-model="startDate" :maxDate="endDate" placeholder="Start Date" :format="format" textInput/>
                </div>
                <div class="enddate">
                    <Datepicker inputClassName="dp-custom-input" v-model="endDate" :minDate="startDate" :format="format" placeholder="End Date"  />
                </div>
                <div class="status">
                    <Filter>
                        <template #info>
                            Status
                        </template>
                        <template #input>
                            <input class="border-2 text-sm p-3 rounded h-10 w-full mx-auto" placeholder="Add Status">
                        </template>
                    <template #list>
                        <li><p class="py-2 px-5 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">
                            Active
                        </p></li>
                        <li><p class="py-2 px-5 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">Disabled</p></li>
                        <li><p class="py-2 px-5 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">None</p></li>
                    </template>
                    </Filter>
                </div>
                <div class="courses">
                    <Filter>
                        <template #info>
                            Courses
                        </template>
                        <template #input>
                            <input class="border-2 text-sm p-3 rounded h-10 w-full mx-auto" placeholder="Add Status">
                        </template>
                    <template #list>
                        <li><p class="py-2 px-5 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">
                            Active
                        </p></li>
                        <li><p class="py-2 px-5 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">Disabled</p></li>
                        <li><p class="py-2 px-5 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">None</p></li>
                    </template>
                    </Filter>
                </div>
            </div>
            <div class="search-items flex bg-white rounded-t-lg justify-between items-center px-11 py-5">
                <div class="status">
                    <button class="px-10 py-4 bg-gray-300 text-grey rounded-md">
                        Apply Filter
                    </button>
                </div>
                <div class="search">
                    <Search>
                        <template #input>
                            <input @keyup.esc="close" @keyup="filter" v-model="searchText" class="rounded text-sm p-1 focus:outline-none" type="text" placeholder="Enter title and Batch No..">
                        </template>
                    </Search>
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

</style>

<style>
.dp-custom-input {
    @apply py-3 rounded-md shadow-inner;
}
</style>
