<script lang="ts">
import { onMounted, reactive } from 'vue'
import { useStore } from 'vuex'

export default {
    name: 'Instructor',
}
</script>

<script setup lang="ts">
import InstructorHeader from '../../../components/dashboard/instructors/InstructorHeader.vue';
import InstructorList from '../../../components/dashboard/instructors/InstructorList.vue';
</script>

<template>
    <div class="main mx-9">
        <InstructorHeader />
        <InstructorList />
    </div>
</template>
