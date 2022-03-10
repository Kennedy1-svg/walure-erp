<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "StudentInBatch",
});
</script>

<script setup lang="ts">
import ViewStudentHeader from '../../../components/dashboard/students/ViewStudentHeader.vue';
import ViewStudentList from '../../../components/dashboard/students/ViewStudentList.vue';

</script>

<template>
    <div class="main mx-5 px-5 overflow-hidden">
        <div class="top">
        <ViewStudentHeader />
        </div>
        <div class="list">
        <ViewStudentList />
        </div>
    </div>
</template>