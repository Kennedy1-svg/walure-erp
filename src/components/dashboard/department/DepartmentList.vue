<script lang="ts">
 export default {
    name:'DepartmentLIst'
 }
</script>

<script setup lang="ts">
import {ref,computed, onMounted} from 'vue'
import { api_url } from '../../../config/index'
import * as departmentActionTypes from '../../../store/module/department/constants/actions';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import SvgIcons from '../../SvgIcons.vue';
import DeleteModal from '../../DeleteModal.vue'
import Modal from '../../Modals.vue'
import CreateDepartment from '../department/CreateDepartment.vue'

const store = useStore()
const route = useRoute()

const showDelete = ref(false);
const showEdit = ref(false)


const department:any =  computed(() => {
    return store.getters.getDepartment.value.payload
})

const totalCount:any =  computed(() => {
    return store.getters.getDepartment.value.totalCount
})

const router = useRouter()

let departmenttodelete:any = ref('')

const emits = defineEmits(['close']);

const closeModal:any = async () => {
  emits('close')
  setTimeout(() => {
    showDelete.value = false;
  }, 500);
}

const sendId:any = (id:any) => {
    console.log('departmentid', id)
    departmenttodelete.value = id
    console.log('departmenttodelete', departmenttodelete.value)
    return departmenttodelete
}

const deleteDepartment:any = async (id:any) => {
    console.log('dept', id);

    const request:any = `${api_url}api/Department/${id}`;
    console.log('requestData', request)
    await store.dispatch(departmentActionTypes.RemoveDepartment, request)
    await store.dispatch(departmentActionTypes.FetchDepartment)
    closeModal()  
}

const editDepartment:any = async (department:any) => {
    console.log('department', department)
    const request:any = `${api_url}api/Department/get-department/${department}`;
    console.log('request for the', request)
    await store.dispatch(departmentActionTypes.FetchEditDepartment, request)
}




// console.log('department data', department.value)

onMounted( async () => {
    console.log('department List mounted');
    const request:any = `${api_url}api/Department/getall-department`;
    console.log('the url is', request)
    await store.dispatch(departmentActionTypes.FetchDepartment, request)
    console.log('department data',department.value)
})
    

</script>

<template>
    <div class="main grid p-6">
        <div class="title flex justify-between pr-32 xl:pr-0 items-center mb-10">
            <h1 class="text-2xl font-semibold text-black">Department List</h1>
            <p class="text-xl font-medium text-primary">Total : {{ totalCount }}</p> 
        </div>

        <!-- {{ department }} -->

        <div class="grid grid-cols-4 gap-4">
          <div v-for="(departmentitem) in department" :key="departmentitem.id">
            <div class="rounded-t-md p-3 h-12 flex justify-end bg-primary">
                <SvgIcons name="walurelogo" />
            </div>
            <div class="border-2 bg-white p-5">
                <div class="flex justify-between items-center">
                 <router-link :to="{ name: 'DepartmentDetails', params:{ id : departmentitem.id}}">
                  <h1 class="text-left capitalize font-bold my-2">{{ departmentitem.name }}</h1>
                 </router-link>
                 <div class="relative inline-block dropdown">
                    <button class="flex justify-around gap-8 items-center rounded" type="button" aria-haspopup="true" aria-expanded="true" aria-controls="headlessui-menu-items-117">
                     <SvgIcons name="ellipsis" />
                    </button>
                    <div class="absolute z-10 opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 w-40">
                        <div class="absolute right-36 w-full mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none" aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">
                            <div class="py-3 gap-3">
                             <button
                               type="button"
                               @click="showDelete = !showDelete"
                               @click.prevent=sendId(departmentitem.id)
                               class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left">
                             <SvgIcons name="delete" />
                                 Delete
                            </button>
                            <DeleteModal :show="showDelete" @close="showDelete = !showDelete" @delete=deleteDepartment(departmenttodelete)>
                                                    <template #title>
                                                        Delete Department
                                                    </template>
                                                    <template #info>
                                                        Are you sure you want to remove department?
                                                    </template>
                                                    <template #delete>
                                                        Yes, Delete department
                                                    </template>
                             </DeleteModal>

                             <button
                               type="button"
                               @click="showEdit = !showEdit"
                               @click.prevent=editDepartment(departmentitem.id)
                               class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left">
                             <SvgIcons name="edit" />
                                 Edit
                            </button>
                            
                                <Modal :show="showEdit" @close="showEdit = !showEdit">
                                  <CreateDepartment name="Edit" @close="showEdit = false"  />
                                 </Modal>
                            </div>
                        </div>
                    </div>
                   </div>                              
             
            </div>                           
               <p class="text-xs text-left">{{ departmentitem.description }}</p>
            </div>
        </div>  
        </div>
    </div>  
    <div>
</div> 
</template>

<style scoped>

.dropdown:focus-within .dropdown-menu {
    opacity:1;
    transform: translate(0) scale(1);
    visibility: visible;
    }


</style>