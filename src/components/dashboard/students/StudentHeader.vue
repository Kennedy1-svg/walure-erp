<script lang="ts">
export default {
  name: 'StudentHeader',
}
</script>

<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue';
import Search from '../../Search.vue';
import Filter from '../../Filter.vue';
import Modal from '../../Modal.vue';
import AddStudent from './AddStudents.vue';
import { ref } from 'vue';

let searchText:any = ref('');

const filter:any = async () => {
  const search:any = searchText.value.toLowerCase();
  const students:any = document.getElementById('students');
  const rows:any = students.getElementsByTagName('tr');

  for (let i:any = 0; i < rows.length; i++) {
    const firstCol:any = rows[i].getElementsByTagName('td')[1];
    const secondCol:any = rows[i].getElementsByTagName('td')[2];
    const thirdCol:any = rows[i].getElementsByTagName('td')[3];
    const fourthCol:any = rows[i].getElementsByTagName('td')[4];

    if (
      firstCol.innerText.toLowerCase().indexOf(search) > -1 ||
      secondCol.innerText.toLowerCase().indexOf(search) > -1 ||
      thirdCol.innerText.toLowerCase().indexOf(search) > -1 ||
      fourthCol.innerText.toLowerCase().indexOf(search) > -1
    ) {
      rows[i].style.display = '';
    } else {
      rows[i].style.display = 'none';
    }
  }
}

const close:any = async () => {
  searchText.value = ''
}

</script>

<template>
    <div class="main pt-[50px] grid gap-5 pb-[90px]">
        <div class="top flex justify-between items-center">
            <h1 class="font-semibold text-2xl">Students</h1>
            <button class="focus:outline-none flex items-center gap-3 text-sm">
                <p class="text-grey font-semibold">Add Student</p>
                <div class="relative overflow-hdden">
                    <section class="flex h-full justify-ceter items-start">
                        <div onclick="document.getElementById('myoal').showModal()" id="btn">
                            <span class="bg-blue p-1 flex justify-center text-white rounded-md">
                                <SvgIcons name="plus" /> <!-- plus icon -->
                            </span>
                        </div>
                    </section>

                    <dialog id="myoal" class="h-auto w-11/12 md:w-1/2 p-5 bg-white rounded-md ">            
                        <div class="w-full h-auto">
                            <!-- Modal Content-->
                                <AddStudent />
                            <!-- End of Modal Content-->
                        </div>
                    </dialog>
                </div>
            </button>
        </div>
        <div class="filter flex bg-white rounded-t-lg justify-between items-center px-11 py-5">
            <div class="status">
                <Filter>
                    <template #info>
                        <span class="pl-5 pr-56">Status</span>
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
            <div class="search">
                <Search />
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
