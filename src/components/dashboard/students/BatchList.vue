<script lang="ts">
export default {
  name: 'BatchList',
}
</script>

<script setup lang="ts">
import moment from 'moment'
import SvgIcons from '../../SvgIcons.vue';
import AddBatch from './AddBatch.vue';
import Modal from '../../Modals.vue';
import DeleteModal from '../../DeleteModal.vue';
import { computed, ref, onMounted, reactive } from 'vue';
import { useStore } from 'vuex'
import * as actionTypes from '../../../store/module/batch/constants/action'
import * as mutationTypes from '../../../store/module/batch/constants/mutation'
import { api_url } from '../../../config'
import pagination from '../../pagination.vue'
import { useRouter } from 'vue-router';

const route = useRouter();

const store = useStore();

const batch:any = computed(() => {
    return store.getters.getBatch.value
})

const del:any = ref(false)

const totalCount:any = computed(() => {
    return store.getters.getTotalBatchCount.value
})

let batchitemtodelete:any = ref('')

const setId:any = (id:any) => {
    console.log('batchid', id)
    // route.push(`/dashboard/batch/view-student/${id}`)
    route.push({
        name: 'StudentInBatch',
        params: {
            id: id
        }
    })
    // const request:any = `${api_url}api/batch/${id}`;
    // console.log('request forid', request)
    // store.dispatch(actionTypes.FetchBatch, request)
}

const sendId:any = (id:any) => {
    console.log('batchid', id)
    batchitemtodelete.value = id
    console.log('batchitemtodelete', batchitemtodelete.value)
    return batchitemtodelete
}

// const today:any = '2023-11-15T13:45:30'

const showEdit = ref(false);

const showDelete = ref(false);

const showStudents = ref(false);

const totalPages:any = computed(() => {
    // (totalCount.value % 10 != 0) ? `Math.floor(${totalCount.value} / 10) + 1` : `${totalCount.value} / 10`;
    console.log(totalCount.value)
    let total:any
    if (totalCount.value % 10 != 0) {
        total = Math.floor(totalCount.value / 10) + 1;
    } else {
        total = totalCount.value / 10;
    }
    return total
})

let pageIndex: any = ref(1);

const emits = defineEmits(['close', 'deletebatch']);

const closeModal:any = async () => {
  emits('close')
  setTimeout(() => {
    showDelete.value = false;
  }, 500);
}

const editingBatch:any = ref('')

const editBatch:any = async (batchitem:any) => {
    console.log('studentbatchitem', batchitem)
    const editingBatch:any = batchitem;
    const request:any = `${api_url}api/batch/batchNInstructor/${batchitem}`;
    console.log('request for the', request)
    await store.dispatch(actionTypes.FetchEditBatch, request)
    // console.log('student', student)
    // console.log('student', student.value)
}

const deleteBatch:any = async (id:any) => {
    console.log('batch id', id);

    const request:any = `${api_url}api/batch/delete/${id}`;

    console.log('requestData', request)
    store.dispatch(actionTypes.RemoveBatch, request)
    closeModal()
    const fetchrequest:any = `${api_url}api/batch/get-batches`;
    console.log('url', fetchrequest)
    del.value = false
    await store.dispatch(actionTypes.FetchBatch, fetchrequest)
}

const onPageChange:any = async (page:any) => {
    console.log('page suppose don change')
    console.log('page na', page)
    pageIndex.value = page;
    console.log('pageIndex is', pageIndex.value)
    const request:any = `${api_url}api/batch/get-batches/${pageIndex.value}/10`;
    console.log('url', request)
    await store.dispatch(actionTypes.FetchBatch, request)
}

onMounted(async() => {
    console.log('I started here');
    // const request:any = 'https://walurebackofficev1.azurewebsites.net/api/student/get-students/{pageIndex}/{pageSize}';
    const request:any = `${api_url}api/batch/get-batches/{pageIndex}/{pageSize}`;
    console.log('url', request)
    await store.dispatch(actionTypes.FetchBatch, request)
})

</script>

<template>
    <div class="main grid">
        <div class="title flex justify-between pr-32 xl:pr-0 items-center mb-10">
            <h1 class="text-2xl font-semibold text-black">Cohort List</h1>
            <p class="text-xl font-medium text-primary">Total : {{ totalCount }}</p>
        </div>
        <div class="table">
            <div class="block w-full oveflow-x-scroll xl:overflow-hidden overflow-y-hidden rounded-lg">
                <table class="overflow-x-scroll border items-center w-full -mr-16">
                    <thead class="bg-table-head">
                    <tr class="justify-items-center">
                        <th class="pl-4 pr-3 align-middle py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-medium text-gray-500 text-left">
                        S/N
                        </th>
                        <th class="align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">
                        Cohort name
                        </th>
                        <th class="px-4 align-middle py-2 text-xs whitespace-nowrap font-medium text-gray-500 text-left">
                        Course Title
                        </th>
                        <th class="px-4 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">Cohort no</th>
                        <th class="px-4 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">Start <br /> /End date(s)</th>
                        <th class="px-4 align-middle py-2 text-xs whitespace-nowrap font-medium text-gray-500 text-left">Status</th>
                        <th class="px-4 align-middle py-2 text-xs whitespace-nowrap font-medium text-gray-500 text-left">Instructors</th>
                        <th class="px-4 align-middle py-2 text-xs whitespace-nowrap font-medium text-gray-500 text-left">Levels</th>
                        <th class="px-3 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">Action</th>
                    </tr>
                    </thead>
                    <tbody id="batchlist" class="bg-white">
                        <!-- {{ batch }} -->
                    <tr v-for="(batchitem) in batch" :key="batchitem.id">
                    <!-- {{ batchitem }} -->
                        <td class="border-t-0 pl-4 pr-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4">
                            {{ pageIndex == 1 ? (batch.indexOf(batchitem) + 1) : ((pageIndex - 1) * 10) + (batch.indexOf(batchitem) + 1) }}
                        </td>
                        <td class="border-t-0 font-normal align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 text-left">
                            {{ batchitem.title }}
                        </td>
                        <td class="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                            {{ batchitem.courseTitle }}
                        </td>
                        <td class="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                            {{ batchitem.batchNo }}
                        </td>
                        <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {{ moment(batchitem.startDate).format('MM/DD/YYYY') }} - <br /> 
                            {{ moment(batchitem.endDate).format('MM/DD/YYYY') }}
                        </td>
                        <td class="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                            {{ batchitem.status == 0 ? 'Pending' : batchitem.status == 2 ? 'Completed' : 'Ongoing' }}
                        </td>
                        <td class="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                            <!-- <p class="w-28 truncate"> -->
                                {{ batchitem.instructors.map((e:any) => e.fullName).join(', ') }}
                            <!-- </p>                             -->
                        </td>
                        <td class="border-t-0 px-2 text-left align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <!-- <p class="w-28 truncate"> -->
                                {{ batchitem.instructors.map((e:any) => e.experienceLevel == 1 ? 'Beginner' : e.experienceLevel == 2 ? 'Intermediate' : e.experienceLevel == 3 ? 'Experienced' : null ).join(', ') }}
                            <!-- </p>     -->
                        </td>
                        <td class="border-t-0 pl-3 pr-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-right">
                            <div class="relative inline-block dropdown">
                                <button class="flex justify-around gap-8 items-center rounded" type="button" aria-haspopup="true" aria-expanded="true" aria-controls="headlessui-menu-items-117">
                                    <SvgIcons name="ellipsis" />
                                </button>
                                <div class="absolute z-10 opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 w-44">
                                    <div class="absolute right-36 w-full mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none" aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">
                                        <div class="py-3 gap-3">
                                            <button
                                            type="button"
                                            @click="showEdit = !showEdit" @click.prevent="editBatch(batchitem.id)"
                                            class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left"
                                            >
                                                <SvgIcons name="edit" />
                                                Edit
                                            </button>
                                            <Modal :show="showEdit" @close="showEdit = false">
                                                <AddBatch name="Edit" @close="showEdit = !showEdit"  />
                                            </Modal>

                                            <button
                                            type="button"
                                            @click="showStudents = !showStudents" @click.prevent="setId(batchitem.id)"
                                            class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left"
                                            >                                        
                                                <SvgIcons name="eye" />
                                                View Student
                                            </button>

                                            <button
                                            type="button"
                                            @click="showDelete = !showDelete" @click.prevent="sendId(batchitem.id)"
                                            class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left"
                                            >
                                                <SvgIcons name="delete" />
                                                Delete
                                            </button>
                                            <DeleteModal :show="showDelete" @close="showDelete = !showDelete" @delete="deleteBatch(batchitemtodelete)">
                                                    <template #title>
                                                        Delete cohort
                                                    </template>
                                                    <template #info>
                                                        Are you sure you want to remove cohort?
                                                    </template>
                                                    <template #delete>
                                                        Yes, Delete Cohort
                                                    </template>
                                            </DeleteModal>
                                            <!-- <Modal class="flex py-2 hover:bg-gray-100">
                                                <template #button>
                                                    <span class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 text-sm text-left">
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
                                                    <span tabindex="0" class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 text-sm text-left"  role="menuitem" >
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
                                                    <span tabindex="0" class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 text-sm text-left"  role="menuitem" >
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
                                                    <span tabindex="0" class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 text-sm text-left"  role="menuitem" >
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
                <div class="flex items-center pt-6 px-6 mb-40 text-xs text-gray-700 justify-between">
                    <div class="">
                        Page {{ pageIndex }} of {{ totalPages }}
                    </div>
                    <div class="">
                        <pagination
                            :totalPages=totalPages
                            @pageChanged="onPageChange"
                        />
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

</style>
