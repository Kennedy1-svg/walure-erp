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
import alert from '../../../components/alerts.vue';
import SvgIcons from '../../../components/SvgIcons.vue';
import { useStore } from 'vuex'
const store = useStore();

const alertState:any = computed(() => store.getters.getCourseAlertStatus.value)
const alertText:any = computed(() => store.getters.getCourseAlertText.value)

const status:any = computed(() => {
    let answer:any
    if (alertText.value.includes('successfully')) {
        answer = true
    } else {
        answer = false
    }
    return answer
})

</script>

<template>
    <div class="main grid mx-9 pt-5">
        <alert :class="[alertState ? '' : 'hidden']"  class="fixed z-60 top-40 bg-white p-2 right-0" name="result">
          <template #icon>
            <p v-if="status" class="bg-green-accent rounded-full border p-2">
                <SvgIcons class="text-white" name="tick" />
            </p>
            <p v-else class="">
                <SvgIcons class="text-red" name="exclamation" />
            </p>
          </template>
          <template #info>
            <p class="text-sm">
                {{ alertText }}
            </p>
          </template>
          <template #button></template>
        </alert>
      <CurriculumHeader />
      <CurriculumBody />
    </div>
</template>