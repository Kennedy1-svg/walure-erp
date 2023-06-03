<script lang="ts">
export default {
    name: 'DepartmentDetailsList'

}
</script>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useStore } from 'vuex';
import { computed, onMounted, ref } from 'vue'
import { api_url } from '../../../config/index'
import * as departmentActionTypes from '../../../store/module/department/constants/actions';


const route = useRoute()
const store = useStore()
let pageIndex: any = ref(1)

const departmentId:any = computed(() => {
    return store.getters.getDepartmentType.value.payload 
})

const total_count:any = computed(() => {
    return store.getters.getDepartmentType.value.totalCount 
})

const id:any = route.params.id

onMounted(async() => {
    console.log('department List mounted');
    const request:any = `${api_url}api/Department/get-department/${id}`;
    console.log('the url is', request)
    await store.dispatch(departmentActionTypes.FetchDepartmentType, request)
    console.log('department data',departmentId.value)

} )


</script>

<template>
     <div class="main grid mt-3 px-7">
        <div class="title flex justify-between items-center mb-10">
            <h1 class="text-2xl font-semibold text-black">Staff List </h1>
            <p class="text-xl pr-3 font-medium text-primary">Total : {{ total_count }}</p>
        </div>
    </div>

        <div class="table border w-full">
            <div class="block w-full overflow-x-scroll xl:overflow-hidden overflow-y-hidden rounded-lg">
                <table class="overflow-x-scroll border items-center w-full">
                    <thead class="bg-table-head">
                    <tr class="justify-items-center">
                        <th class="pl-6 pr-3 align-middle py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-medium text-gray-500 text-left">
                        S/N
                        </th>
                        <th class="align-middle px-2 py-3 text-xs flex items-center whitespace-nowrap font-medium text-gray-500 text-left">
                        Name
                        </th>
                        <th class="px-2 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">
                        Email
                        </th>
                        <th class="px-2 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">Staff ID</th>
                        <!-- <th class="px-2 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">Action</th> -->
                    </tr>
                    </thead>
                    <!-- {{ departmentId }} -->
                    <tbody id="departmentdetails" class="bg-white"> 
                         <tr :key="departmentId.id"> 
                            <td class="border-t-0 pl-6 pr-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4">
                                {{ pageIndex }}
                                <!-- {{ pageIndex == 1 ? (departmentId.indexOf(departmentitem) + 1) : ((pageIndex - 1) * 10) + (departmentId.indexOf(departmentitem) + 1) }} -->
                            </td>
                            <td class="border-t-0 px-4 font-normal align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 text-left">
                                {{ departmentId.name }}
                            </td>
                            <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                {{ departmentId.email }}
                            </td>
                            <td class="border-t-0 px-4 font-normal align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 text-left">
                                {{ departmentId.uniqueIdentifierCode }}
                            </td>
                        </tr>
                     </tbody>     
                </table> 
            </div>
            
        </div>
        

    
    

        

           
    
    
</template>

