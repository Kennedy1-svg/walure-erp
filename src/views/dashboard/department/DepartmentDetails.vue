<script lang="ts">
export default {
    name: 'DepartmentDetails'
}
</script>

<script setup lang="ts">
import DepartmentDetailsHeader from '../../../components/dashboard/department/DepartmentDetailsHeader.vue'
import DepartmentDetailsList from '../../../components/dashboard/department/DepartmentDetailsList.vue'


</script>

<template>
    <div>
        <DepartmentDetailsHeader />
        <DepartmentDetailsList />
    </div>
    
</template>