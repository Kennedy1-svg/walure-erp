<script lang="ts">
export default {
  name: "ViewStudentHeader",
};
</script>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { api_url } from '../../../config';
import breadcrumbs from '../../breadcrumbs.vue'
import Search from '../../Search.vue';
import SvgIcons from '../../SvgIcons.vue';
import * as studentActionTypes from '../../../store/module/students/constants/action'
import * as courseActionTypes from '../../../store/module/courses/constants/action'
import { useStore } from 'vuex'

const store = useStore();

const start:any = ref(
  {
    name: 'Cohort',
    path: '/dashboard/student-management/cohort'
  },
)

const end:any = ref(
  {
    name: 'StudentList',
    path: '#'
  }
)

</script>

<template>
  <div class="main grid pt-[50px] pb-[90px] gap-5">
    <div class="top flex justify-between items-center">
        <h1 class="font-semibold text-2xl">Student List</h1>
    </div>
    <breadcrumbs :start="start" :end="end" />    
    <div class="filter flex bg-white rounded-t-lg justify-end items-center px-11 py-5">
      <div class="search">
          <Search />
      </div>
    </div>
  </div>
</template>