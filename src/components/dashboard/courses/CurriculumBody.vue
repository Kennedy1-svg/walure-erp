<script lang="ts">
export default {
  name: "CurriculumBody",
};
</script>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { api_url } from '../../../config';
import SvgIcons from '../../SvgIcons.vue';
import * as studentActionTypes from '../../../store/module/students/constants/action'
import * as courseActionTypes from '../../../store/module/courses/constants/action'
import CourseCard from '../../../components/dashboard/courses/CourseCard.vue';
import CurriculumTabs from '../../../components/dashboard/courses/CurriculumTabs.vue';
import { useStore } from 'vuex'

const store = useStore();

</script>

<template>
  <div class="main flex pt-[5px] pb-[90px] gap-5">
      <div class="course-card w-1/3">
        <CourseCard />
      </div>
      <div class="tabs w-2/3">
        <CurriculumTabs />
      </div>
  </div>
</template>