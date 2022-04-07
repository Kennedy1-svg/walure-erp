<script lang="ts">
import { ref, computed, onMounted } from 'vue';
export default {
    name: 'CourseApplicantView',
};
</script>

<script setup lang="ts">
import CourseApplicantHeader from '../../../components/dashboard/courses/CourseApplicantHeader.vue';
import CourseApplicantList from '../../../components/dashboard/courses/CourseApplicantList.vue';
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
    <div class="main mx-9">
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
        <CourseApplicantHeader />
        <CourseApplicantList />
    </div>
</template>
