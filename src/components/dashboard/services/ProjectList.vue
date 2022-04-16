<script lang="ts">
export default {
  name: 'ProjectList',
}
</script>

<script setup lang="ts">
import moment from 'moment'
import SvgIcons from '../../SvgIcons.vue';
import AddProject from './AddProject.vue';
import ProjectDetails from './ProjectDetails.vue';
import UpdateProjectStatus from './UpdateProjectStatus.vue';
import Modal from '../../Modals.vue';
import DeleteModal from '../../DeleteModal.vue';
import { computed, ref, onMounted, reactive } from 'vue';
import { useStore } from 'vuex'
import * as actionTypes from '../../../store/module/services/constants/action'
import * as mutationTypes from '../../../store/module/services/constants/mutation'
import { api_url } from '../../../config'
import pagination from '../../pagination.vue'
import Delete from '../../delete.vue'
import { useRouter } from 'vue-router';

const route = useRouter();

const store = useStore();

const project:any = computed(() => {
    return store.getters.getProject.value.payload
})

const totalCount:any = computed(() => {
    return store.getters.getProject.value.totalCount
})

const setId:any = async (id:any) => {
    console.log('instructorid', id)
    const request:any = `${api_url}api/project/${id}`;
    console.log('request forid', request)
    await store.dispatch(actionTypes.FetchEditProject, request)
}

// const today:any = '2023-11-15T13:45:30'

const showEdit = ref(false);

const showDelete = ref(false);

const showStudents = ref(false);

const projectitemtodelete:any = ref('');

const sendId:any = (id:any) => {
    console.log('projectid', id)
    projectitemtodelete.value = id
    console.log('projectitemtodelete', projectitemtodelete.value)
    return projectitemtodelete
}

const deleteProject:any = async (id:any) => {
    console.log('batch id', id);

    const request:any = `${api_url}api/project/delete/${id}`;

    console.log('requestData', request)
    await store.dispatch(actionTypes.RemoveProject, request)
    // const fetchrequest:any = `${api_url}api/project/get-projects/{pageIndex}/{pageSize}`;
    // console.log('url', fetchrequest)
    // del.value = false
    await store.dispatch(actionTypes.FetchProject)
    closeModal()
}

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

const showUpdateStatus = ref(false);

const showDetails = ref(false);


let pageIndex: any = ref(1);

const emits = defineEmits(['close']);

const closeModal:any = async () => {
  emits('close')
  setTimeout(() => {
    showDelete.value = false;
  }, 500);
}

const editProject:any = async (id:any) => {
    console.log('studentid', id)
    const request:any = `${api_url}api/project/${id}`;
    console.log('request for the', request)
    await store.dispatch(actionTypes.FetchEditProject, request)
    // console.log('student', student)
    // console.log('student', student.value)

}

// const deleteProject:any = async (id:any) => {
//     console.log('project id', id);

//     const request:any = `${api_url}api/project/delete/${id}`;

//     console.log('requestData', request)
//     store.dispatch(actionTypes.RemoveProject, request)
//     // closeModal()
//     const fetchrequest:any = `${api_url}api/project/get-projects`;
//     console.log('url', fetchrequest)
//     await store.dispatch(actionTypes.FetchProject, fetchrequest)
// }

const onPageChange:any = async (page:any) => {
    console.log('page suppose don change')
    console.log('page na', page)
    pageIndex.value = page;
    console.log('pageIndex is', pageIndex.value)
    const request:any = `${api_url}api/project/get-projects/${pageIndex.value}/{pageSize}`;
    // console.log('url', request)
    await store.dispatch(actionTypes.FetchProject)
}

onMounted(async() => {
    console.log('I started here');
    // const request:any = 'https://walurebackofficev1.azurewebsites.net/api/student/get-students/{pageIndex}/{pageSize}';
    const request:any = `${api_url}api/project/get-projects/{pageIndex}/{pageSize}`;
    console.log('url', request)
    await store.dispatch(actionTypes.FetchProject, request)
})

</script>

<template>
    <div class="main grid">
        <div class="title flex justify-between pr-32 xl:pr-0 items-center mb-10">
            <h1 class="text-2xl font-semibold text-black">Project List</h1>
            <p class="text-xl font-medium text-primary">Total : {{ totalCount }}</p>
        </div>
        <div class="table">
            <!-- {{ project }} -->
            <div class="block w-full oveflow-x-scroll xl:overflow-hidden overflow-y-hidden rounded-lg">
                <table class="overflow-x-scroll border items-center w-full -mr-16">
                    <thead class="bg-table-head">
                    <tr class="justify-items-center">
                        <th class="pl-4 pr-3 align-middle py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-medium text-gray-500 text-left">
                        S/N
                        </th>
                        <th class="align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">
                        Project title
                        </th>
                        <th class="px-4 align-middle py-2 text-xs whitespace-nowrap font-medium text-gray-500 text-left">
                        Company name
                        </th>
                        <th class="px-4 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">Duration</th>
                        <th class="px-4 align-middle py-2 text-xs whitespace-nowrap font-medium text-gray-500 text-left">No of resources</th>
                        <th class="px-4 align-middle py-2 text-xs whitespace-nowrap font-medium text-gray-500 text-left">Status</th>
                        <th class="px-3 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">Action</th>
                    </tr>
                    </thead>
                    <tbody id="projectlist" class="bg-white">
                    <tr v-for="(projectitem) in project" :key="projectitem.id">
                    <!-- {{ projectitem }} -->
                        <td class="border-t-0 pl-4 pr-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4">
                            {{ project.indexOf(projectitem) + 1 }}
                        </td>
                        <td class="border-t-0 font-normal align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 text-left">
                            {{ projectitem.title }}
                        </td>
                        <td class="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                            {{ projectitem.companyName }}
                        </td>
                        <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {{ moment(projectitem.startDate).format('MM/DD/YYYY') }} - <br /> 
                            {{ moment(projectitem.endDate).format('MM/DD/YYYY') }}
                        </td>
                        <td class="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                            {{ projectitem.noOfResources }}
                        </td>
                        <td class="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                            {{ projectitem.status == '0' ? 'Pending' : projectitem.status == 1 ? 'Ongoing' : 'Ended' }}
                        </td>
                      <td class="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          
                            <div class="relative inline-block dropdown">
                                <button class="flex justify-around gap-8 items-center rounded" type="button" aria-haspopup="true" aria-expanded="true" aria-controls="headlessui-menu-items-117">
                                    <SvgIcons name="ellipsis" />
                                </button>
                                <div class="absolute z-10 opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 w-44">
                                    <div class="absolute right-36 w-full mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none" aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">
                                        <div class="py-3 gap-3">
                                            <button
                                            type="button"
                                            @click="showDetails = !showDetails" @click.prevent="setId(projectitem.id)"
                                            class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left"
                                            >
                                                <SvgIcons name="details" />
                                                Details
                                            </button>
                                            <Modal :show="showDetails" @close="showDetails = false">
                                                <ProjectDetails @close="showDetails = !showDetails" />
                                            </Modal>

                                            <button
                                            type="button"
                                            @click="showUpdateStatus = !showUpdateStatus"
                                            @click.prevent="setId(projectitem.id)"    
                                            class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left"
                                            >
                                                <SvgIcons name="update" />
                                                Update Status
                                            </button>
                                            <Modal :show="showUpdateStatus" @close="showUpdateStatus = !showUpdateStatus">
                                                <UpdateProjectStatus @close="showUpdateStatus = !showUpdateStatus" />
                                            </Modal>

                                            <button
                                            type="button"
                                            @click="showEdit = !showEdit" @click.prevent="setId(projectitem.id)"
                                            class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left"
                                            >
                                                <SvgIcons name="edit" />
                                                Edit
                                            </button>
                                            <Modal :show="showEdit" @close="showEdit = !showEdit">
                                                <AddProject name="Edit" @close="showEdit = !showEdit" />
                                            </Modal>

                                            <button
                                            type="button"
                                            @click="showDelete = !showDelete" @click.prevent="sendId(projectitem.id)"
                                            class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left"
                                            >
                                                <SvgIcons name="delete" />
                                                Delete
                                            </button>
                                            <DeleteModal :show="showDelete" @close="showDelete = !showDelete" @delete="deleteProject(projectitemtodelete)">
                                                    <template #title>
                                                        Delete project
                                                    </template>
                                                    <template #info>
                                                        Are you sure you want to remove project?
                                                    </template>
                                                    <template #delete>
                                                        Yes, Delete Project
                                                    </template>
                                            </DeleteModal>
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
