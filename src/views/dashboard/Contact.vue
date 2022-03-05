<script setup lang="ts">
import { ref } from 'vue';
import MenuItem from '../../components/pagination.vue'
import Chart from '../../components/switch.vue'
import Test from '../../components/dashboard/students/AddStudents.vue'
import spinner from '../../components/spinner.vue'

let visible = ref(false);

const openModal = () => {
  visible.value = true;
}

const close = () => {
  visible.value = false;
}

let currentPage: any = ref(1);

const onPageChange:any = (page:any) => {
  console.log('page suppose don change')
  console.log('page na', page)
  currentPage.value = page;
}

</script>

<template>
<div class="p-20">
  <spinner />
    <Chart />
    <MenuItem
      :totalPages="10"
      :perPage="10"
      :currentPage="currentPage.value"
      @pageChanged="onPageChange"
    >      
    </MenuItem>
</div>
</template>
