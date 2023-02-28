<script lang="ts">
import { onMounted, ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'

export default {
    name: 'LeaveManagementList',
}
</script>

<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue';
import pagination from '../../pagination.vue'
// import AddLeaveManagement from './AddLeaveManagement.vue';
import Modal from '../../Modals.vue';
import DeleteModal from '../../DeleteModal.vue';
// import ViewLeaveManagementDetails from './ViewLeaveManagement.vue'
import * as actionTypes from '../../../store/module/account/constants/action';
import moment from 'moment';
import { account_api_url } from '../../../config';

import { useRouter } from 'vue-router';

const route = useRouter();

const leaves:any = computed(() => {
    // return store.getters.getLeaveManagement.value.payload;
})

const total_count:any = computed(() => {
    // return store.getters.getLeaveManagement.value.totalCount;
})

let pageIndex: any = ref(1);

const onPageChange:any = async (page:any) => {
    console.log('page suppose don change')
    console.log('page na', page)
    pageIndex.value = page;
    console.log('pageIndex is', pageIndex.value)
    const request:any = `${account_api_url}api/leave/getall-leave?pageIndex=${pageIndex.value}`;
    console.log('url', request)
    // await store.dispatch(actionTypes.FetchLeaveManagement, request)
}

let leaveitemtodelete:any = ref('')

const sendId:any = (id:any) => {
    console.log('batchid', id)
    leaveitemtodelete.value = id
    console.log('leaveitemtodelete', leaveitemtodelete.value)
    return leaveitemtodelete
}

const editLeaveManagement:any = async (leave:any) => {
    console.log('leave', leave)
    const request:any = `${account_api_url}api/leave/get-leave/${leave}`;
    console.log('request for the', request)
    // await store.dispatch(actionTypes.FetchEditLeaveManagement, request)
}

const deleteLeaveManagement:any = async (id:any) => {
    console.log('category category', id);

    const request:any = `${account_api_url}api/leave/delete-leave/${id}`;

    console.log('requestData', request)
    // await store.dispatch(actionTypes.RemoveLeaveManagement, request)
    // await store.dispatch(actionTypes.FetchLeaveManagement)
    closeModal()
    // const fetchrequest:any = `${account_api_url}api/coursecategory/get-categories/{pageNumber}/{pageSize}`;
    // console.log('url', fetchrequest)
    // await store.dispatch(actionTypes.FetchLeaveManagementQuotes)
}

const emits = defineEmits(['close']);

const closeModal:any = async () => {
  emits('close')
  setTimeout(() => {
    showDelete.value = false;
  }, 500);
}

const totalPages:any = computed(() => {
    // (totalCount.value % 10 != 0) ? `Math.floor(${totalCount.value} / 10) + 1` : `${totalCount.value} / 10`;
    console.log(total_count.value)
    let total:any
    if (total_count.value % 10 != 0) {
        total = Math.floor(total_count.value / 10) + 1;
    } else {
        total = total_count.value / 10;
    }
    return total
})

const setId:any = (id:any) => {
    console.log('leave', id)
    // const request:any = `${account_api_url}api/leave-management/get-leave-details/${id}`;
    // console.log('request forid', request)
    // store.dispatch(actionTypes.FetchEditLeaveManagement, request)
    route.push({
        name: 'EditLeaveManagement',
        params: {
            id: id
        }
    })
}

const toggle:any = (status:any) => {
    if (status == 0) {
        return status = 1
    } else {
        return status = 0
    }
}

const showAddToBatch = ref(false);

const showEdit = ref(false);

const showDelete = ref(false);

const showDetails = ref(false);

const store = useStore();

onMounted( async () => {
    // store.commit('setPageTitle', 'Course List');
    console.log('LeaveManagement List mounted');
    const request:any = `${account_api_url}api/leave/getall-leave`;
    // await store.dispatch(actionTypes.FetchLeaveManagement)
});
</script>

<template>
    <div class="main grid mt-3">
        <div class="title flex justify-between items-center mb-10">
            <h1 class="text-2xl font-semibold text-black">Leave List</h1>
            <p class="text-xl pr-3 font-medium text-primary">Total : {{ total_count }}</p>
        </div>
        <div class="table">
            <!-- {{ leaves }} -->
        <div class="block w-full overflow-x-scroll xl:overflow-hidden overflow-y-hidden rounded-lg">
            <table class="overflow-x-scroll border items-center w-full">
                <thead class="bg-table-head">
                <tr class="justify-items-center">
                    <th class="pl-6 pr-3 align-middle py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-medium text-gray-500 text-left">
                    S/N
                    </th>
                    <th class="align-middle px-4 py-3 text-xs flex items-center whitespace-nowrap font-medium text-gray-500 text-left">
                    Name
                    </th>
                    <th class="px-4 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">
                    Email
                    </th>
                    <th class="align-middle px-4 py-3 text-xs flex items-center whitespace-nowrap font-medium text-gray-500 text-left">
                    Start Date
                    </th>
                    <th class="px-4 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">
                    End Date
                    </th>
                    <th class="px-4 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">Action</th>
                </tr>
                </thead>

                <tbody id="students" class="bg-white">
                  <tr v-for="(leave) in leaves" :key="leave.id">
                      <td class="border-t-0 pl-6 pr-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4">
                          {{ pageIndex == 1 ? (leaves.indexOf(leave) + 1) : ((pageIndex - 1) * 10) + (leaves.indexOf(leave) + 1) }}
                      </td>
                      <td class="border-t-0 px-4 font-normal align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 text-left">
                          {{ leave.categoryName }}
                      </td>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                          {{ leave.item }}
                      </td>
                      <td class="border-t-0 px-4 font-normal align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 text-left">
                        {{ moment(leave.createdOn).format('MM/DD/YYYY') }}
                      </td>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        {{ moment(leave.transactionDate).format('MM/DD/YYYY') }}
                      </td>
                      <td class="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        <div class="relative inline-block dropdown">
                            <button class="flex justify-around gap-8 items-center rounded" type="button" aria-haspopup="true" aria-expanded="true" aria-controls="headlessui-menu-items-117">
                                <SvgIcons name="ellipsis" />
                            </button>
                            <div class="absolute z-10 opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 w-40">
                                <div class="absolute right-36 w-full mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none" aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">
                                    <div class="py-3 gap-3">
                                        <button
                                        type="button"
                                        @click="showEdit = !showEdit" @click.prevent="editLeaveManagement(leave.id)"
                                        class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left"
                                        >
                                            <SvgIcons name="edit" />
                                            Edit
                                        </button>
                                        <Modal :show="showEdit" @close="showEdit = !showEdit">
                                            <AddLeaveManagement name="Edit" @close="showEdit = !showEdit"  />
                                        </Modal>

                                        <button
                                        type="button"
                                        @click="showDetails = !showDetails"
                                        @click.prevent="editLeaveManagement(leave.id)"
                                        class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left"
                                        >
                                            <SvgIcons name="details" />
                                            View Details
                                        </button>
                                        <Modal :show="showDetails" @close="showDetails = !showDetails">
                                            <ViewLeaveManagementDetails :id="leave.id" @close="showDetails = !showDetails" />
                                        </Modal>

                                        <!-- <button
                                        type="button"
                                        @click="showDelete = !showDelete" @click.prevent="sendId(leave.id)"
                                        class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left"
                                        >
                                            <SvgIcons name="delete" />
                                            Delete
                                        </button> -->
                                        <!-- <DeleteModal :show="showDelete" @close="showDelete = !showDelete" @delete="deleteLeaveManagement(leaveitemtodelete)">
                                            <template #title>
                                                Delete LeaveManagement
                                            </template>
                                            <template #info>
                                                Are you sure you want to remove leave?
                                            </template>
                                            <template #delete>
                                                Yes, Delete LeaveManagement
                                            </template>
                                        </DeleteModal> -->
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
    input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .toggler {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgb(227, 227, 227);
        -webkit-transition: 0.4s;
        transition: 0.4s;
    }

    .toggler::before {
        @apply absolute w-5 h-5 -left-[4px] -bottom-[4px] bg-primary;
        content: '';
    }

    input:checked + .toggler {
        @apply bg-primary bg-opacity-[38%];
    }

    input:checked + .toggler:before {
        -webkit-transform: translateX(20px);
        -ms-transform: translateX(20px);
        transform: translateX(20px);
    }

    .toggler.round {
        border-radius: 34px;
    }

    .toggler.round:before {
        border-radius: 50%;
    }

    .dropdown:focus-within .dropdown-menu {
    opacity:1;
    transform: translate(0) scale(1);
    visibility: visible;
    }

</style>
