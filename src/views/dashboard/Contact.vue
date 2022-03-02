<script setup lang="ts">
import { ref } from 'vue';
import MenuItem from '../../components/Modaals.vue'
import Chart from '../../components/switch.vue'
import Test from '../../components/dashboard/students/AddStudents.vue'

let visible = ref(false);

const openModal = () => {
  visible.value = true;
}

const close = () => {
  visible.value = false;
}

</script>

<template>
<div class="p-20">
    <button type="button" class="text-primary" @click="openModal()">
      Open Modal
    </button>
    <MenuItem v-show="visible" @keyup.esc="close" @close="close">
      <template #top-header> 
        Modal Header
      </template>

      <template #main-body>
          <Test />
      </template>

      <template #main-footer>
        You can put your footer here
      </template>
    </MenuItem>
    <Chart />
</div>
</template>
