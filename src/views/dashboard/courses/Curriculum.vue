<script lang="ts">
import { ref, computed, onMounted } from 'vue';
export default {
  name: 'CurriculumView',
}
</script>

<script setup lang="ts">
import breadcrumb from '../../../components/breadcrumbs.vue';
import CourseCard from '../../../components/dashboard/courses/CourseCard.vue';
import CurriculumTabs from '../../../components/dashboard/courses/CurriculumTabs.vue';
import CurriculumHeader from '../../../components/dashboard/courses/CurriculumHeader.vue';
import CurriculumBody from '../../../components/dashboard/courses/CurriculumBody.vue';

</script>

<template>
    <div class="main grid mx-9 pt-5">
      <CurriculumHeader />
      <CurriculumBody />
    </div>
</template>