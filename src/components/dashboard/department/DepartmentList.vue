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

const store = useStore()



const department:any =  computed(() => {
    return store.getters.getDepartment.value
})

// console.log('department data', department.value)

onMounted( async () => {
    console.log('department List mounted');
    const request:any = `${api_url}api/Department/getall-department`;
    console.log('the url is', request)
    await store.dispatch(departmentActionTypes.FetchDepartment, request)
    console.log('department data',department.value)
})
    
// [
//     {
//         'title': 'Academy',
//         'about':  'Lorem ipsom et adhkjgjjh',
//         'members': 10,
//         'id': 1
//     },{
//         'title': 'Product',
//         'about':  'Lorem ipsom et adhkjgjjh',
//         'members': 10,
//         'id': 2
//     },{
//         'title': 'Frontend',
//         'about':  'Lorem ipsom et adhkjgjjh',
//         'members': 10,
//         'id': 3
//     },{
//         'title': 'Hub',
//         'about':  'Lorem ipsom et adhkjgjjh',
//         'members': 10,
//         'id': 4
//     }
// ]


// const totalCount:any = department.value.length

</script>

<template>
     <div class="main grid p-6">
        <div class="title flex justify-between pr-32 xl:pr-0 items-center mb-10">
            <h1 class="text-2xl font-semibold text-black">Department List</h1>
            <p class="text-xl font-medium text-primary">Total : 0</p>
        </div>

        <!-- {{ department }} -->

        <!-- <div class="bg-white grid grid-cols-4 gap-4">
        <div v-for="(departmentitem) in department" :key="departmentitem.id"> 
        <div class="border-2 p-4 cursor-pointer"> 
            <h1 class="text-center">{{ departmentitem.title }}</h1>
         </div>
        </div>  
        </div> -->

     
    </div>  
   
    

    <div>

    </div>

    
</template>