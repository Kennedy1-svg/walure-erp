<script lang="ts">
export default {
    name: 'CategoryView',
};
</script>

<script setup lang="ts">
import CourseCategoryHeader from '../../../components/dashboard/courses/CourseCategoryHeader.vue';
import CourseCategoryList from '../../../components/dashboard/courses/CourseCategoryList.vue';
import alert from '../../../components/alerts.vue';
import SvgIcons from '../../../components/SvgIcons.vue';
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore();

const alertState:any = computed(() => store.getters.getCourseAlertStatus.value)
const alertText:any = computed(() => store.getters.getCourseAlertText.value)
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
        <CourseCategoryHeader />
        <CourseCategoryList />
    </div>
</template>
