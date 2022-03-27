<script lang="ts">
import { onMounted, reactive } from 'vue'
import { useStore } from 'vuex'

export default {
    name: 'TalentHeader',
}
</script>

<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue';
import Search from '../../Search.vue';
import AddTalent from './AddTalents.vue'
import Filter from '../../Filter.vue';
import Modal from '../../Modal.vue';
import * as courseActionTypes from '../../../store/module/courses/constants/action';

const store = useStore();

const closeModal:any = () => {
  // document.getElementById('addinstructor').showModal()
  console.log('close student modal')
  let doc:any = document.getElementById('addinstructor')
  doc.close()  
}

onMounted(() => {
    // store.commit('setPageTitle', 'Talent List');
    console.log('TalentHeader mounted');
});

</script>

<template>
    <div class="main pt-[50px] grid gap-5 pb-[90px]">
        <div class="top flex justify-between items-center">
            <h1 class="font-semibold text-2xl">Talent Pool</h1>
            <div class="buttons flex gap-10">
                <button class="focus:outline-none flex items-center gap-3 text-sm">
                    <p class="text-grey font-semibold">Add Talent</p>
                <div class="relative overflow-hdden">
                    <section class="flex h-full justify-ceter items-start">
                        <div onclick="document.getElementById('addinstructor').showModal()" id="btn">
                            <span class="bg-blue p-1 flex justify-center text-white rounded-md">
                                <SvgIcons name="plus" /> <!-- plus icon -->
                            </span>
                        </div>
                    </section>

                    <dialog id="addinstructor" class="h-auto w-11/12 md:w-1/2 p-5 bg-white rounded-md ">            
                        <div class="w-full h-auto">
                            <!-- Modal Content-->
                                <AddTalent @close="closeModal" />
                            <!-- End of Modal Content-->
                        </div>
                    </dialog>
                </div>
                </button>
                <button class="focus:outline-none flex items-center gap-3 text-sm">
                    <p class="text-grey font-semibold">Add Skill</p>
                <div class="relative overflow-hdden">
                    <section class="flex h-full justify-ceter items-start">
                        <div onclick="document.getElementById('addskill').showModal()" id="btn">
                            <span class="bg-blue p-1 flex justify-center text-white rounded-md">
                                <SvgIcons name="plus" /> <!-- plus icon -->
                            </span>
                        </div>
                    </section>

                    <dialog id="addskill" class="h-auto w-11/12 md:w-4/5 p-5 bg-white rounded-md ">            
                        <div class="w-full h-auto">
                            <!-- Modal Content-->
                                <AddTalent @close="closeModal" />
                            <!-- End of Modal Content-->
                        </div>
                    </dialog>
                </div>
                </button>
            </div>
        </div>
        <div class="filter flex bg-white rounded-t-lg justify-between items-center px-11 py-5">
            <div class="status">
                <Filter>
                    <template #info>
                        <span class="pl-5 pr-56">Categories</span>
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
