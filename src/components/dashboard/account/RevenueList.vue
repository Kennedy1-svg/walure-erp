<script lang="ts">
import { onMounted, ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'

export default {
    name: 'RevenueList',
}
</script>

<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue';
import pagination from '../../pagination.vue'
import AddRevenue from './AddRevenue.vue';
import Modal from '../../Modals.vue';
import DeleteModal from '../../DeleteModal.vue';
import ViewRevenueDetails from './ViewRevenue.vue'
import * as actionTypes from '../../../store/module/account/constants/action';
import moment from 'moment';
import { account_api_url } from '../../../config';

import { useRouter } from 'vue-router';

const route = useRouter();

const revenues:any = computed(() => {
    return store.getters.getRevenue.value.payload;
})

const total_count:any = computed(() => {
    return store.getters.getRevenue.value.totalCount;
})

let pageIndex: any = ref(1);

const onPageChange:any = async (page:any) => {
    console.log('page suppose don change')
    console.log('page na', page)
    pageIndex.value = page;
    console.log('pageIndex is', pageIndex.value)
    const request:any = `${account_api_url}api/revenue/getall-revenue?pageIndex=${pageIndex.value}`;
    console.log('url', request)
    await store.dispatch(actionTypes.FetchRevenue, request)
}

let revenueitemtodelete:any = ref('')

const sendId:any = (id:any) => {
    console.log('batchid', id)
    revenueitemtodelete.value = id
    console.log('revenueitemtodelete', revenueitemtodelete.value)
    return revenueitemtodelete
}

const editRevenue:any = async (revenue:any) => {
    console.log('revenue', revenue)
    const request:any = `${account_api_url}api/revenue/get-revenue/${revenue}`;
    console.log('request for the', request)
    await store.dispatch(actionTypes.FetchEditRevenue, request)
}

const deleteRevenue:any = async (id:any) => {
    console.log('category category', id);

    const request:any = `${account_api_url}api/revenue/delete-revenue/${id}`;

    console.log('requestData', request)
    await store.dispatch(actionTypes.RemoveRevenue, request)
    await store.dispatch(actionTypes.FetchRevenue)
    closeModal()
    // const fetchrequest:any = `${account_api_url}api/coursecategory/get-categories/{pageNumber}/{pageSize}`;
    // console.log('url', fetchrequest)
    // await store.dispatch(actionTypes.FetchRevenueQuotes)
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
    console.log('revenue', id)
    // const request:any = `${account_api_url}api/revenue-management/get-revenue-details/${id}`;
    // console.log('request forid', request)
    // store.dispatch(actionTypes.FetchEditRevenue, request)
    route.push({
        name: 'EditRevenue',
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
    console.log('Revenue List mounted');
    const request:any = `${account_api_url}api/revenue/getall-revenue`;
    await store.dispatch(actionTypes.FetchRevenue)
});
</script>

<template>
    <div class="main grid mt-3">
        <div class="title flex justify-end items-center mb-10">
            <!-- <h1 class="text-2xl font-semibold text-black">Revenue List</h1> -->
            <p class="text-xl pr-3 font-medium text-primary">Total : {{ total_count }}</p>
        </div>
        <div class="table">
            <!-- {{ revenues }} -->
        <div class="block w-full overflow-x-scroll xl:overflow-hidden overflow-y-hidden rounded-lg">
            <table class="overflow-x-scroll border items-center w-full">
                <thead class="bg-table-head">
                <tr class="justify-items-center">
                    <th class="pl-6 pr-3 align-middle py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-medium text-gray-500 text-left">
                    S/N
                    </th>
                    <th class="align-middle px-4 py-3 text-xs flex items-center whitespace-nowrap font-medium text-gray-500 text-left">
                    Category
                    </th>
                    <th class="px-4 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">
                    Items
                    </th>
                    <th class="align-middle px-4 py-3 text-xs flex items-center whitespace-nowrap font-medium text-gray-500 text-left">
                    Unique Identifier Code
                    </th>
                    <th class="px-4 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">
                    Amount
                    </th>
                    <th class="align-middle px-4 py-3 text-xs flex items-center whitespace-nowrap font-medium text-gray-500 text-left">
                    Date/Time Created
                    </th>
                    <th class="px-4 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">
                    Date of transaction
                    </th>
                    <th class="px-4 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">Action</th>
                </tr>
                </thead>

                <tbody id="students" class="bg-white">
                  <tr v-for="(revenue) in revenues" :key="revenue.id">
                      <td class="border-t-0 pl-6 pr-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4">
                          {{ pageIndex == 1 ? (revenues.indexOf(revenue) + 1) : ((pageIndex - 1) * 10) + (revenues.indexOf(revenue) + 1) }}
                      </td>
                      <td class="border-t-0 px-4 font-normal align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 text-left">
                          {{ revenue.categoryName }}
                      </td>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                          {{ revenue.item }}
                      </td>
                      <td class="border-t-0 px-4 font-normal align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 text-left">
                          {{ revenue.uniqueIdentifierCode }}
                      </td>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                          {{ revenue.amount }}
                      </td>
                      <td class="border-t-0 px-4 font-normal align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 text-left">
                        {{ moment(revenue.createdOn).format('MM/DD/YYYY') }}
                      </td>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        {{ moment(revenue.transactionDate).format('MM/DD/YYYY') }}
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
                                        @click="showDetails = !showDetails"
                                        @click.prevent="editRevenue(revenue.id)"
                                        class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left"
                                        >
                                            <SvgIcons name="details" />
                                            Details
                                        </button>
                                        <Modal :show="showDetails" @close="showDetails = !showDetails">
                                            <ViewRevenueDetails :id="revenue.id" @close="showDetails = !showDetails" />
                                        </Modal>

                                        <button
                                        type="button"
                                        @click="showEdit = !showEdit" @click.prevent="editRevenue(revenue.id)"
                                        class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left"
                                        >
                                            <SvgIcons name="edit" />
                                            Edit
                                        </button>
                                        <Modal :show="showEdit" @close="showEdit = !showEdit">
                                            <AddRevenue name="Edit" @close="showEdit = !showEdit"  />
                                        </Modal>

                                        <button
                                        type="button"
                                        @click="showDelete = !showDelete" @click.prevent="sendId(revenue.id)"
                                        class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left"
                                        >
                                            <SvgIcons name="delete" />
                                            Delete
                                        </button>
                                        <DeleteModal :show="showDelete" @close="showDelete = !showDelete" @delete="deleteRevenue(revenueitemtodelete)">
                                            <template #title>
                                                Delete Revenue
                                            </template>
                                            <template #info>
                                                Are you sure you want to remove revenue?
                                            </template>
                                            <template #delete>
                                                Yes, Delete Revenue
                                            </template>
                                        </DeleteModal>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- <div class="flex w-2/5 items-center">
                            <button
                            type="button"
                            @click="showEdit = !showEdit" @click.prevent="editRevenue(revenue.id)"
                            class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full py-2 text-sm text-left"
                            >
                                <SvgIcons name="edit" />
                            </button>
                            <Modal :show="showEdit" @close="showEdit = !showEdit">
                                <AddRevenue name="Edit" @close="showEdit = !showEdit"  />
                            </Modal>

                            <button
                            type="button"
                            @click="showDelete = !showDelete" @click.prevent="sendId(revenue.id)"
                            class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left"
                            >
                                <SvgIcons name="delete" />
                            </button>
                            <DeleteModal :show="showDelete" @close="showDelete = !showDelete" @delete="deleteRevenue(revenueitemtodelete)">
                                    <template #title>
                                        Delete Revenue
                                    </template>
                                    <template #info>
                                        Are you sure you want to remove revenue?
                                    </template>
                                    <template #delete>
                                        Yes, Delete Revenue
                                    </template>
                            </DeleteModal>
                        </div> -->
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
