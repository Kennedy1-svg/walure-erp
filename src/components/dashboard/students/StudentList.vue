<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue';
import StudentDetails from './StudentDetails.vue';
import AddToBatch from './AddToBatch.vue';
import Modal from '../../Modal.vue';
import AddStudents from './AddStudents.vue';
import Switch from '../../switch.vue';
import { computed, ref, onMounted, reactive } from 'vue';
import { useStore } from 'vuex'
import * as actionTypes from '../../../store/module/students/constants/action'
import * as mutationTypes from '../../../store/module/students/constants/mutation'
import { api_url } from '../../../config'

const store = useStore();

const students:any = computed(() => {
    return JSON.parse(JSON.stringify(store.getters.getStudents.value))
})

const totalCount:any = computed(() => {
    return JSON.parse(JSON.stringify(store.getters.getTotalCount.value))
})

onMounted(async() => {
    console.log('I started here');
    // const request:any = 'https://walurebackofficev1.azurewebsites.net/api/student/get-students/{pageIndex}/{pageSize}';
    const request:any = `${api_url}api/student/get-students/1/10`;
    await store.dispatch(actionTypes.FetchStudents, request)
    // const students = JSON.parse(JSON.stringify(store.getters.getStudents.value));
    // console.log('I got here');
    // console.log('students are not yet here');
    // console.log('students are', JSON.parse(JSON.stringify(request.value)));
    // console.log('students should', students);
    // console.log('students can', JSON.parse(JSON.stringify(store.getters.getStudents.value)));
    // console.log('students might', JSON.parse(JSON.stringify(store.getters.getStudents)));
    // console.log('students', store.getters.getStudents.value);
    // console.log('students', store.getters.getStudents);
    // console.log('I am here now');    
})

</script>

<template>
    <div class="main grid">
        <div class="title flex justify-between items-center mb-10">
            <h1 class="text-2xl font-semibold text-black">Student List</h1>
            <p class="text-xl font-medium text-primary">Total : {{ totalCount }}</p>
        </div>
        <div class="table">
            <div class="block w-full overflow-x-auto rounded-lg">
                <table class="overflow-hidden border items-center w-full">
                    <thead class="bg-table-head">
                    <tr class="justify-items-center">
                        <th class="pl-6 pr-3 align-middle py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-medium text-gray-500 text-left">
                        S/N
                        </th>
                        <th class="align-middle py-3 text-xs flex items-center whitespace-nowrap font-medium text-gray-500 text-left">
                        Name
                        </th>
                        <th class="px-6 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">
                        Contact Email
                        </th>
                        <th class="px-6 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">Contact Phone</th>
                        <th class="px-6 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">Reg No.</th>
                        <th class="px-4 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">IsActive </th>
                        <th class="px-4 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">Action</th>
                    </tr>
                    </thead>

                    <tbody id="students" class="bg-white">
                    <tr v-for="(student) in students" :key="student.id">
                        <td class="border-t-0 pl-6 pr-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4">
                            {{ (students.indexOf(student) + 1) }}
                        </td>
                        <th class="border-t-0 font-normal align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 text-left">
                            {{ student.firstName }} {{ student.lastName }}
                        </th>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {{ student.email }}
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {{ student.phoneNumber }}
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {{ student.regNumber }}
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <Switch />
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-right">
                            <div class="relative inline-block dropdown">
                                <button class="flex justify-around gap-8 items-center rounded" type="button" aria-haspopup="true" aria-expanded="true" aria-controls="headlessui-menu-items-117">    <SvgIcons name="ellipsis" />
                                </button>
                                <div class="absolute z-10 opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 w-40">
                                    <div class="absolute right-36 w-full mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none" aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">
                                        <div class="py-3 gap-3">
                                            <div class="relative overflow-hdden">
                                                <section class="flex h-full justify-start items-center py-1 hover:bg-gray-100">
                                                    <div class="focus:outline-none" onclick="document.getElementById('myModal').showModal()" id="btn">
                                                        <span class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py- text-sm text-left">
                                                            <SvgIcons name="doc-add" />
                                                            Add to batch
                                                        </span>
                                                    </div>
                                                </section>

                                                <dialog id="myModal" class="h-auto w-11/12 md:w-1/2 p-5 bg-white rounded-md ">            
                                                    <div class="w-full h-auto">
                                                        <!-- Modal Content-->
                                                            <AddToBatch />
                                                        <!-- End of Modal Content-->
                                                    </div>
                                                </dialog>
                                            </div>
                                            <div class="relative overflow-hdden">
                                                <section class="flex h-full justify-start items-center py-1 hover:bg-gray-100">
                                                    <div class="focus:outline-none" onclick="document.getElementById('myMdal').showModal()" id="btn">
                                                        <span tabindex="0" class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py- text-sm text-left"  role="menuitem" >
                                                        <SvgIcons name="details" />
                                                        Details
                                                    </span>
                                                    </div>
                                                </section>

                                                <dialog id="myMdal" class="h-auto w-11/12 md:w-1/2 p-5 bg-white rounded-md ">            
                                                    <div class="w-full h-auto">
                                                        <!-- Modal Content-->
                                                            <StudentDetails />
                                                        <!-- End of Modal Content-->
                                                    </div>
                                                </dialog>
                                            </div>
                                            <div class="relative overflow-hdden">
                                                <section class="flex h-full justify-start items-center py-1 hover:bg-gray-100">
                                                    <div onclick="document.getElementById('myModl').showModal()" id="btn">
                                                       <span tabindex="0" class="focus:outline-none text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py- text-sm text-left"  role="menuitem" >
                                                            <SvgIcons name="edit" />
                                                            Edit
                                                        </span>
                                                    </div>
                                                </section>

                                                <dialog id="myModl" class="h-auto w-11/12 md:w-1/2 p-5 bg-white rounded-md ">            
                                                    <div class="w-full h-auto">
                                                        <!-- Modal Content-->
                                                            <AddStudents>
                                                                <template #title>
                                                                    Edit
                                                                </template>
                                                            </AddStudents>
                                                        <!-- End of Modal Content-->
                                                    </div>
                                                </dialog>
                                            </div>
                                            <div class="relative overflow-hdden">
                                                <section class="flex h-full justify-start items-center py-1 hover:bg-gray-100">
                                                    <div class="focus:outline-none" onclick="document.getElementById('myodal').showModal()" id="btn">
                                                        <span tabindex="0" class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py- text-sm text-left"  role="menuitem" >
                                                            <SvgIcons name="delete" />
                                                            Delete
                                                        </span>
                                                    </div>
                                                </section>

                                                <dialog id="myodal" class="w-11/12 md:w-2/5 p-5 bg-white rounded-md ">            
                                                    <div class="w-full">
                                                        <!-- Modal Content-->
                                                        <div class="bg-white text-left p-7 rounded grid">
                                                            <div class="flex justify-between mb-6">
                                                                <h1 class="text-xl mb-4 font-medium">
                                                                    Delete Student
                                                                </h1>
                                                                <span>
                                                                    <SvgIcons name="o-cancel" />
                                                                </span>
                                                            </div>
                                                            <p class="text-lg mb-10">Are you sure you want to delete student?</p>
                                                            <div class="flex justify-between items-center mb-3">
                                                                <button class="px-10 py-4 rounded text-primary font-bold">
                                                                    Cancel
                                                                </button>
                                                                <button class="bg-red px-10 py-4 rounded text-white font-bold">
                                                                    Yes, Delete Student
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <!-- End of Modal Content-->
                                                    </div>
                                                </dialog>
                                            </div>
                                            <!-- <Modal class="flex py-2 hover:bg-gray-100">
                                                <template #button>
                                                    <span class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py- text-sm text-left">
                                                        <SvgIcons name="doc-add" />
                                                        Add to batch
                                                    </span>
                                                </template>
                                                <template #content>
                                                    <AddToBatch />
                                                </template>
                                            </Modal>
                                            <Modal class="flex py-2 hover:bg-gray-100">
                                                <template #button>
                                                    <span tabindex="0" class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py- text-sm text-left"  role="menuitem" >
                                                        <SvgIcons name="details" />
                                                        Details
                                                    </span>
                                                </template>
                                                <template #content>
                                                    <StudentDetails />
                                                </template>
                                            </Modal>
                                            <Modal class="flex py-2 hover:bg-gray-100">
                                                <template #button>
                                                    <span tabindex="0" class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py- text-sm text-left"  role="menuitem" >
                                                        <SvgIcons name="edit" />
                                                        Edit
                                                    </span>
                                                </template>
                                                <template #content>
                                                    <AddStudent />
                                                </template>
                                            </Modal>
                                            <Modal class="flex py-2 hover:bg-gray-100">
                                                <template #button>
                                                    <span tabindex="0" class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py- text-sm text-left"  role="menuitem" >
                                                        <SvgIcons name="delete" />
                                                        Delete
                                                    </span>
                                                </template>
                                                <template #content>
                                                    <div class="bg-white p-7 rounded grid">
                                                        <div class="flex justify-between mb-6">
                                                            <h1 class="text-xl mb-4 font-medium">
                                                                Delete Student
                                                            </h1>
                                                            <span>
                                                                <SvgIcons name="o-cancel" />
                                                            </span>
                                                        </div>
                                                        <p class="text-lg mb-10">Are you sure you want to delete student?</p>
                                                        <div class="flex justify-between items-center mb-3">
                                                            <button class="px-10 py-4 rounded text-primary font-bold">
                                                                Cancel
                                                            </button>
                                                            <button class="bg-red px-10 py-4 rounded text-white font-bold">
                                                                Yes, Delete Student
                                                            </button>
                                                        </div>
                                                    </div>
                                                </template>
                                            </Modal> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="flex items-center pt-6 px-6 mb-20 text-xs text-gray-700 justify-between">
                    <div class="">
                        Page 1 of 10
                    </div>
                    <div class="border-t-0 font-normal align-middle border-l-0 border-r-0 whitespace-nowrap py-4 gap-10 text-left flex items-center">
                        <span>
                            <SvgIcons name="previous" />
                        </span>
                        <span>
                            <SvgIcons name="chevron-left" />
                        </span>
                        <span>
                            <SvgIcons name="chevron-right" />
                        </span>
                        <span>
                            <SvgIcons name="next" />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<style scoped>
    .dropdown:focus-within .dropdown-menu {
    opacity:1;
    transform: translate(0) scale(1);
    visibility: visible;
    }

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
