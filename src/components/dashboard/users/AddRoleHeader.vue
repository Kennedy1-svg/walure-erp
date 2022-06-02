<script lang="ts">
export default {
  name: "AddRoleHeader",
};
</script>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { api_url } from '../../../config';
import breadcrumbs from '../../breadcrumbs.vue'
import SvgIcons from '../../SvgIcons.vue';
import * as studentActionTypes from '../../../store/module/students/constants/action'
import * as courseActionTypes from '../../../store/module/courses/constants/action'
import { useStore } from 'vuex'

const store = useStore();

const start:any = ref(
  {
    name: 'Role',
    path: '/dashboard/user-management/roles'
  },
)

const end:any = ref(
  {
    name: 'Add roles and permission',
    path: '#'
  }
)

</script>

<template>
  <div class="main grid pt-[50px] pb-[10px] gap-5">
    <div class="top flex justify-between items-center">
        <h1 class="font-semibold text-2xl">Add Roles and Permission</h1>
    </div>
    <breadcrumbs :start="start" :end="end" />
  </div>
</template>