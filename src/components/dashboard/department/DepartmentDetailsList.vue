<script lang="ts">
export default {
    name: 'DepartmentDetailsList'

}
</script>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue'
import { api_url } from '../../../config/index'
import * as departmentActionTypes from '../../../store/module/department/constants/actions';


const route = useRoute()
const store = useStore()

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
    {{ departmentId }}

        

           
    
    
</template>

