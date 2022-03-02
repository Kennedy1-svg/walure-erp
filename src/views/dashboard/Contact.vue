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
    <Chart />
</div>
</template>
