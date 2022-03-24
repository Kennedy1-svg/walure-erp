<script lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { api_url } from '../../../config'
import { useStore } from 'vuex'

export default {
    name: 'CourseApplicantHeader',
}
</script>

<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue';
import Search from '../../Search.vue';
import Filter from '../../Filter.vue';
import Modal from '../../Modal.vue';
import AddCourseApplicant from './AddCourseApplicant.vue';
import * as courseActionTypes from '../../../store/module/courses/constants/action';

const store = useStore();

const closeModal:any = () => {
  // document.getElementById('myoal').showModal()
  console.log('close course modal')
  let doc:any = document.getElementById('addcourse')
  doc.close()  
}

onMounted(() => {
    // store.commit('setPageTitle', 'Course List');
    console.log('CourseHeader mounted');
});

</script>

<template>
    <div class="main pt-[50px] grid gap-5 pb-[90px]">
        <div class="top flex justify-between items-center">
            <h1 class="font-semibold text-2xl">Course Applicants</h1>
            <button class="focus:outline-none flex items-center gap-3 text-sm">
                <p class="text-grey font-semibold">Add Applicants</p>
                <!-- <Modal>
                    <template #button>
                        <span class="bg-blue p-1 flex justify-center text-white rounded-md"> -->
                            <!-- <SvgIcons name="plus" /> plus icon -->
                        <!-- </span>
                    </template>
                    <template #content>
                        <AddCourseApplicant />
                    </template>
                </Modal> -->

                <div class="relative overflow-hdden">
                    <section class="flex h-full justify-ceter items-start">
                        <div onclick="document.getElementById('addcourse').showModal()" id="btn">
                            <span class="bg-blue p-1 flex justify-center text-white rounded-md">
                                <SvgIcons name="plus" /> <!-- plus icon -->
                            </span>
                        </div>
                    </section>

                    <dialog id="addcourse" class="h-auto w-11/12 md:w-1/2 p-5 bg-white rounded-md ">            
                        <div class="w-full h-auto">
                            <!-- Modal Content-->
                                <AddCourseApplicant @close="closeModal" />
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
    transform: translateX(-10rem);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
} 
</style>
