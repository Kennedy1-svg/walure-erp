<script lang="ts">

export default {
    name: 'EmployeeData',
}
</script>

<script setup lang="ts">
import HRHeader from '../../../components/dashboard/hr/HRHeader.vue';
// import InstructorList from '../../../components/dashboard/hr/InstructorList.vue';
import alert from '../../../components/alerts.vue';
import SvgIcons from '../../../components/SvgIcons.vue';
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore();

const alertState:any = computed(() => store.getters.getInstructorAlertStatus.value)
const alertText:any = computed(() => store.getters.getInstructorAlertText.value)
const batchAlertState:any = computed(() => store.getters.getBatchAlertStatus.value)
const batchAlertText:any = computed(() => store.getters.getBatchAlertText.value)

const status:any = computed(() => {
    let answer:any
    if (alertText.value.includes('successfully') || batchAlertText.value.includes('successfully')) {
        answer = true
    } else {
        answer = false
    }
    return answer
})
</script>

<template>
    <div class="main mx-9">
        <alert :class="[alertState ? '' : batchAlertState ? '' : 'hidden']"  class="fixed z-60 top-40 bg-white p-2 right-0" name="result">
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
                    {{ alertText || batchAlertText }}
                </p>
            </template>
            <template #button></template>
        </alert>
        <HRHeader />
        <InstructorList />
    </div>
</template>
