<script lang="ts">
import { onMounted, ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'

export default {
    name: 'IncomeStatementList',
}
</script>

<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue';
// import EditRole from './EditRoleForm.vue';
// import EditRoleHeader from './EditRoleHeader.vue';
import pagination from '../../pagination.vue'
import Modal from '../../Modals.vue';
import DeleteModal from '../../DeleteModal.vue';
import * as actionTypes from '../../../store/module/users/constants/action';
import { api_url } from '../../../config/index';

import { useRouter } from 'vue-router';

const route = useRouter();

const roles:any = computed(() => {
    return store.getters.getRole.value.payload;
})

const total_count:any = computed(() => {
    return store.getters.getRole.value.totalCount;
})

let pageIndex: any = ref(1);

const onPageChange:any = async (page:any) => {
    console.log('page suppose don change')
    console.log('page na', page)
    pageIndex.value = page;
    console.log('pageIndex is', pageIndex.value)
    const request:any = `${api_url}api/role-management/get-roles/${pageIndex.value}/{pageSize}`;
    console.log('url', request)
    await store.dispatch(actionTypes.FetchRole, request)
}

let roleitemtodelete:any = ref('')

const sendId:any = (id:any) => {
    console.log('batchid', id)
    roleitemtodelete.value = id
    console.log('roleitemtodelete', roleitemtodelete.value)
    return roleitemtodelete
}

const deleteRole:any = async (id:any) => {
    console.log('category category', id);

    const request:any = `${api_url}api/role-management/delete-role/${id}`;

    console.log('requestData', request)
    await store.dispatch(actionTypes.RemoveRole, request)
    await store.dispatch(actionTypes.FetchRole)
    closeModal()
    // const fetchrequest:any = `${api_url}api/coursecategory/get-categories/{pageNumber}/{pageSize}`;
    // console.log('url', fetchrequest)
    // await store.dispatch(actionTypes.FetchRoleQuotes)
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
    console.log('role', id)
    // const request:any = `${api_url}api/role-management/get-role-details/${id}`;
    // console.log('request forid', request)
    // store.dispatch(actionTypes.FetchEditRole, request)
    route.push({
        name: 'EditRole',
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
    console.log('Role List mounted');
    const request:any = `${api_url}api/role-management/get-roles/{pageIndex}/{pageSize}`;
    await store.dispatch(actionTypes.FetchRole)
});
</script>

<template>
    <div class="main grid mt-3">
        <div class="title flex justify-start items-center mb-10">
            <h1 class="text-2xl font-semibold text-black">Statement</h1>
            <!-- <p class="text-xl pr-3 font-medium text-primary">Total : {{ total_count }}</p> -->
        </div>
        <div class="table">
            <!-- {{ roles }} -->
            <div class="block w-full overflow-x-scroll xl:overflow-hidden overflow-y-hidden rounded-lg">
                <table class="overflow-x-scroll border items-center w-full">
                    <thead class="bg-table-head">
                    <tr class="justify-items-center">
                        <th class="pl-6 pr-3 align-middle py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-medium text-gray-500 text-left">
                        S/N
                        </th>
                        <th class="align-middle px-4 py-3 text-xs flex items-center whitespace-nowrap font-medium text-gray-500 text-left">
                        Revenue
                        </th>
                        <th class="px-4 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">
                        Payment Category
                        </th>
                        <th class="align-middle px-4 py-3 text-xs flex items-center whitespace-nowrap font-medium text-gray-500 text-left">
                        Unique Identifier Code
                        </th>
                        <th class="px-4 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">
                        Amount
                        </th>
                    </tr>
                    </thead>

                    <tbody id="students" class="bg-white">
                    <tr v-for="(role) in roles" :key="role.id">
                        <td class="border-t-0 pl-6 pr-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4">
                            {{ pageIndex == 1 ? (roles.indexOf(role) + 1) : ((pageIndex - 1) * 10) + (roles.indexOf(role) + 1) }}
                        </td>
                        <td class="border-t-0 px-4 font-normal align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 text-left">
                            {{ role.role }}
                        </td>
                        <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {{ role.modifiedOn }}
                        </td>
                        <td class="border-t-0 px-4 font-normal align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 text-left">
                            {{ role.role }}
                        </td>
                        <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {{ role.modifiedOn }}
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
